"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Edit2, ChevronUp, ChevronDown, Save, Menu as MenuIcon, X } from "lucide-react";

interface MenuItem {
    id: string;
    label: string;
    url: string;
    type: "internal" | "external" | "dropdown";
    children?: MenuItem[];
    order: number;
}

interface MenuData {
    id: string;
    name: string;
    location: "header" | "footer";
    items: MenuItem[];
}

const EMPTY_ITEM: Omit<MenuItem, "id" | "order"> = {
    label: "", url: "", type: "internal", children: [],
};

export default function AdminMenuPage() {
    const [menus, setMenus] = useState<MenuData[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeMenu, setActiveMenu] = useState<"header" | "footer">("header");
    const [editingItem, setEditingItem] = useState<string | null>(null);
    const [addingItem, setAddingItem] = useState(false);
    const [addingChildTo, setAddingChildTo] = useState<string | null>(null);
    const [itemForm, setItemForm] = useState(EMPTY_ITEM);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => { fetchMenus(); }, []);

    const fetchMenus = async () => {
        const res = await fetch("/api/menus");
        const data = await res.json();
        setMenus(data);
        setLoading(false);
    };

    const currentMenu = menus.find(m => m.location === activeMenu);

    const handleSaveMenu = async () => {
        if (!currentMenu) return;
        setSaving(true);
        try {
            const res = await fetch("/api/menus", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: currentMenu.id, items: currentMenu.items }),
            });
            if (res.ok) {
                setSaved(true);
                setTimeout(() => setSaved(false), 3000);
            }
        } finally {
            setSaving(false);
        }
    };

    const updateMenuItems = (items: MenuItem[]) => {
        setMenus(prev => prev.map(m =>
            m.location === activeMenu ? { ...m, items } : m
        ));
    };

    const handleAddItem = () => {
        if (!currentMenu || !itemForm.label) return;
        const newItem: MenuItem = {
            ...itemForm,
            id: `item-${Date.now()}`,
            order: currentMenu.items.length,
            children: itemForm.type === "dropdown" ? [] : undefined,
        };
        updateMenuItems([...currentMenu.items, newItem]);
        setItemForm({ ...EMPTY_ITEM });
        setAddingItem(false);
    };

    const handleAddChild = (parentId: string) => {
        if (!currentMenu || !itemForm.label) return;
        const child: MenuItem = {
            ...itemForm,
            id: `item-${Date.now()}`,
            order: 0,
            type: "internal",
        };
        const items = currentMenu.items.map(item => {
            if (item.id === parentId) {
                const children = [...(item.children ?? []), child];
                return { ...item, children: children.map((c, i) => ({ ...c, order: i })) };
            }
            return item;
        });
        updateMenuItems(items);
        setItemForm({ ...EMPTY_ITEM });
        setAddingChildTo(null);
    };

    const handleUpdateItem = (id: string) => {
        if (!currentMenu) return;
        const items = currentMenu.items.map(item =>
            item.id === id ? { ...item, ...itemForm, children: itemForm.type === "dropdown" ? (item.children ?? []) : undefined } : item
        );
        updateMenuItems(items);
        setEditingItem(null);
        setItemForm({ ...EMPTY_ITEM });
    };

    const handleDeleteItem = (id: string) => {
        if (!currentMenu || !confirm("Delete this menu item?")) return;
        const items = currentMenu.items.filter(item => item.id !== id).map((item, i) => ({ ...item, order: i }));
        updateMenuItems(items);
    };

    const handleDeleteChild = (parentId: string, childId: string) => {
        if (!currentMenu) return;
        const items = currentMenu.items.map(item => {
            if (item.id === parentId) {
                const children = (item.children ?? []).filter(c => c.id !== childId).map((c, i) => ({ ...c, order: i }));
                return { ...item, children };
            }
            return item;
        });
        updateMenuItems(items);
    };

    const handleMoveItem = (index: number, direction: "up" | "down") => {
        if (!currentMenu) return;
        const items = [...currentMenu.items];
        const swapIndex = direction === "up" ? index - 1 : index + 1;
        if (swapIndex < 0 || swapIndex >= items.length) return;
        [items[index], items[swapIndex]] = [items[swapIndex], items[index]];
        updateMenuItems(items.map((item, i) => ({ ...item, order: i })));
    };

    const startEditItem = (item: MenuItem) => {
        setEditingItem(item.id);
        setItemForm({ label: item.label, url: item.url, type: item.type });
        setAddingItem(false);
        setAddingChildTo(null);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
                        <ArrowLeft className="h-5 w-5" /> Dashboard
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">Menu Management</h1>
                </div>
                <div className="flex items-center gap-3">
                    {saved && <span className="text-green-600 text-sm font-medium">Saved!</span>}
                    <button onClick={handleSaveMenu} disabled={saving}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60">
                        <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save Menu"}
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto p-8">
                {loading ? (
                    <p className="text-gray-500">Loading...</p>
                ) : (
                    <>
                        {/* Menu Tabs */}
                        <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit mb-6">
                            {(["header", "footer"] as const).map(loc => (
                                <button key={loc} onClick={() => { setActiveMenu(loc); setEditingItem(null); setAddingItem(false); setAddingChildTo(null); }}
                                    className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all ${activeMenu === loc ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"}`}>
                                    {loc} Menu
                                </button>
                            ))}
                        </div>

                        {/* Menu Items */}
                        {currentMenu && (
                            <div className="space-y-2">
                                {currentMenu.items.length === 0 && !addingItem && (
                                    <div className="text-center py-12">
                                        <MenuIcon className="h-12 w-12 text-gray-200 mx-auto mb-4" />
                                        <p className="text-gray-500 mb-4">No menu items yet.</p>
                                    </div>
                                )}

                                {currentMenu.items.map((item, index) => (
                                    <div key={item.id}>
                                        {editingItem === item.id ? (
                                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3">
                                                <div className="grid grid-cols-3 gap-3">
                                                    <input value={itemForm.label} onChange={e => setItemForm(f => ({ ...f, label: e.target.value }))}
                                                        placeholder="Label" className="px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                                                    <input value={itemForm.url} onChange={e => setItemForm(f => ({ ...f, url: e.target.value }))}
                                                        placeholder="URL (e.g. /about)" className="px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                                                    <select value={itemForm.type} onChange={e => setItemForm(f => ({ ...f, type: e.target.value as MenuItem["type"] }))}
                                                        className="px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500">
                                                        <option value="internal">Internal</option>
                                                        <option value="external">External</option>
                                                        <option value="dropdown">Dropdown</option>
                                                    </select>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={() => handleUpdateItem(item.id)} className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Save</button>
                                                    <button onClick={() => { setEditingItem(null); setItemForm({ ...EMPTY_ITEM }); }} className="px-4 py-1.5 border rounded-lg text-sm hover:bg-gray-50">Cancel</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3">
                                                <div className="flex flex-col gap-0.5">
                                                    <button onClick={() => handleMoveItem(index, "up")} disabled={index === 0}
                                                        className="p-0.5 text-gray-400 hover:text-gray-700 disabled:opacity-30">
                                                        <ChevronUp className="h-3.5 w-3.5" />
                                                    </button>
                                                    <button onClick={() => handleMoveItem(index, "down")} disabled={index === currentMenu.items.length - 1}
                                                        className="p-0.5 text-gray-400 hover:text-gray-700 disabled:opacity-30">
                                                        <ChevronDown className="h-3.5 w-3.5" />
                                                    </button>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium text-gray-900 text-sm">{item.label}</span>
                                                        <span className={`text-xs px-2 py-0.5 rounded-full ${item.type === "dropdown" ? "bg-purple-100 text-purple-700" : item.type === "external" ? "bg-orange-100 text-orange-700" : "bg-gray-100 text-gray-600"}`}>
                                                            {item.type}
                                                        </span>
                                                    </div>
                                                    {item.url && <p className="text-xs text-gray-400 mt-0.5">{item.url}</p>}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    {item.type === "dropdown" && (
                                                        <button onClick={() => { setAddingChildTo(item.id); setItemForm({ ...EMPTY_ITEM }); setEditingItem(null); }}
                                                            className="p-2 text-gray-400 hover:text-green-600 rounded-lg hover:bg-green-50" title="Add child">
                                                            <Plus className="h-4 w-4" />
                                                        </button>
                                                    )}
                                                    <button onClick={() => startEditItem(item)} className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50">
                                                        <Edit2 className="h-4 w-4" />
                                                    </button>
                                                    <button onClick={() => handleDeleteItem(item.id)} className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50">
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Children */}
                                        {item.children && item.children.length > 0 && (
                                            <div className="ml-10 mt-1 space-y-1">
                                                {item.children.map(child => (
                                                    <div key={child.id} className="bg-gray-50 rounded-lg border border-gray-100 p-3 flex items-center gap-3">
                                                        <div className="flex-1 min-w-0">
                                                            <span className="font-medium text-gray-700 text-sm">{child.label}</span>
                                                            {child.url && <span className="text-xs text-gray-400 ml-2">{child.url}</span>}
                                                        </div>
                                                        <button onClick={() => handleDeleteChild(item.id, child.id)} className="p-1.5 text-gray-400 hover:text-red-600 rounded hover:bg-red-50">
                                                            <Trash2 className="h-3.5 w-3.5" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Add Child Form */}
                                        {addingChildTo === item.id && (
                                            <div className="ml-10 mt-1 bg-green-50 border border-green-200 rounded-lg p-3 space-y-2">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <input value={itemForm.label} onChange={e => setItemForm(f => ({ ...f, label: e.target.value }))}
                                                        placeholder="Child label" className="px-3 py-1.5 border rounded-lg text-sm outline-none" />
                                                    <input value={itemForm.url} onChange={e => setItemForm(f => ({ ...f, url: e.target.value }))}
                                                        placeholder="URL" className="px-3 py-1.5 border rounded-lg text-sm outline-none" />
                                                </div>
                                                <div className="flex gap-2">
                                                    <button onClick={() => handleAddChild(item.id)} className="px-3 py-1 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700">Add</button>
                                                    <button onClick={() => setAddingChildTo(null)} className="px-3 py-1 border rounded-lg text-xs hover:bg-gray-50">Cancel</button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {/* Add Item Form */}
                                {addingItem ? (
                                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3">
                                        <h3 className="text-sm font-medium text-gray-900">Add Menu Item</h3>
                                        <div className="grid grid-cols-3 gap-3">
                                            <input value={itemForm.label} onChange={e => setItemForm(f => ({ ...f, label: e.target.value }))}
                                                placeholder="Label" className="px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                                            <input value={itemForm.url} onChange={e => setItemForm(f => ({ ...f, url: e.target.value }))}
                                                placeholder="URL (e.g. /about)" className="px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                                            <select value={itemForm.type} onChange={e => setItemForm(f => ({ ...f, type: e.target.value as MenuItem["type"] }))}
                                                className="px-3 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500">
                                                <option value="internal">Internal</option>
                                                <option value="external">External</option>
                                                <option value="dropdown">Dropdown</option>
                                            </select>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={handleAddItem} className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Add Item</button>
                                            <button onClick={() => { setAddingItem(false); setItemForm({ ...EMPTY_ITEM }); }} className="px-4 py-1.5 border rounded-lg text-sm hover:bg-gray-50">Cancel</button>
                                        </div>
                                    </div>
                                ) : (
                                    <button onClick={() => { setAddingItem(true); setItemForm({ ...EMPTY_ITEM }); setEditingItem(null); setAddingChildTo(null); }}
                                        className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors w-full justify-center text-sm">
                                        <Plus className="h-4 w-4" /> Add Menu Item
                                    </button>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
