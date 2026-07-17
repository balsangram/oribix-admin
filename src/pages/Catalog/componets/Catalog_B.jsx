import React, { useEffect, useMemo, useState } from "react";
import {
  Package,
  Loader2,
  ImageIcon,
  Pencil,
  X,
  Upload,
  Trash2,
  Layers,
  Plus,
  IndianRupee,
  Eye,
  Store,
  Boxes,
  MapPin,
} from "lucide-react";
import { SEARCH } from "../../../components/basicComponents/Search";
import { toast } from "../../../components/basicComponents/TostMessage";
import { getProducts, getProductDetails, updateProduct } from "../../../api/admin";

const emptyForm = {
  name: "",
  slug: "",
  hsnCode: "",
  gstPercentage: "",
  isActive: true,
};

function Catalog_B() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const [editing, setEditing] = useState(null); // product being edited
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  // image state
  const [thumbUrl, setThumbUrl] = useState(""); // existing thumbnail url
  const [thumbFile, setThumbFile] = useState(null); // newly selected thumbnail file
  const [thumbPreview, setThumbPreview] = useState(""); // preview for new thumbnail
  const [existingImages, setExistingImages] = useState([]); // kept image urls
  const [newImages, setNewImages] = useState([]); // [{ file, preview }]

  // bulk pricing state
  const [pricingProduct, setPricingProduct] = useState(null);
  const [tiers, setTiers] = useState([]); // [{ minQty, price }]
  const [savingTiers, setSavingTiers] = useState(false);

  // view details state
  const [viewProduct, setViewProduct] = useState(null); // base product for header
  const [viewDetails, setViewDetails] = useState(null); // full details with vendors
  const [loadingView, setLoadingView] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await getProducts({ limit: 100 });
        setProducts(res?.data?.data?.products || []);
      } catch (err) {
        toast.error(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.slug?.toLowerCase().includes(q) ||
        p.brand?.name?.toLowerCase().includes(q) ||
        p.category?.name?.toLowerCase().includes(q)
    );
  }, [query, products]);

  const openEdit = (p) => {
    setEditing(p);
    setForm({
      name: p.name || "",
      slug: p.slug || "",
      hsnCode: p.hsnCode || "",
      gstPercentage: p.gstPercentage ?? "",
      isActive: p.isActive ?? true,
    });
    setThumbUrl(p.thumbnail || "");
    setThumbFile(null);
    setThumbPreview("");
    setExistingImages(Array.isArray(p.images) ? p.images : []);
    setNewImages([]);
  };

  const closeEdit = () => {
    // revoke object URLs to avoid memory leaks
    if (thumbPreview) URL.revokeObjectURL(thumbPreview);
    newImages.forEach((n) => URL.revokeObjectURL(n.preview));
    setEditing(null);
    setForm(emptyForm);
    setThumbUrl("");
    setThumbFile(null);
    setThumbPreview("");
    setExistingImages([]);
    setNewImages([]);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleThumbChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (thumbPreview) URL.revokeObjectURL(thumbPreview);
    setThumbFile(file);
    setThumbPreview(URL.createObjectURL(file));
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setNewImages((prev) => [
      ...prev,
      ...files.map((file) => ({ file, preview: URL.createObjectURL(file) })),
    ]);
    e.target.value = ""; // allow re-selecting same file
  };

  const removeExistingImage = (url) => {
    setExistingImages((imgs) => imgs.filter((u) => u !== url));
  };

  const removeNewImage = (idx) => {
    setNewImages((prev) => {
      const target = prev[idx];
      if (target) URL.revokeObjectURL(target.preview);
      return prev.filter((_, i) => i !== idx);
    });
  };

  // ── Bulk pricing ──
  const openPricing = (p) => {
    setPricingProduct(p);
    const existing = Array.isArray(p.bulkPricing) ? p.bulkPricing : [];
    setTiers(
      existing.length
        ? existing.map((t) => ({ minQty: String(t.minQty), price: String(t.price) }))
        : [{ minQty: "1", price: "" }]
    );
  };

  const closePricing = () => {
    setPricingProduct(null);
    setTiers([]);
  };

  // ── View details ──
  const openView = async (p) => {
    setViewProduct(p);
    setViewDetails(null);
    setLoadingView(true);
    try {
      const res = await getProductDetails(p.productId);
      setViewDetails(res?.data?.data || null);
    } catch (err) {
      toast.error(err.message || "Failed to load product details");
    } finally {
      setLoadingView(false);
    }
  };

  const closeView = () => {
    setViewProduct(null);
    setViewDetails(null);
    setLoadingView(false);
  };

  const addTier = () => setTiers((t) => [...t, { minQty: "", price: "" }]);

  const removeTier = (idx) =>
    setTiers((t) => t.filter((_, i) => i !== idx));

  const updateTier = (idx, key, value) =>
    setTiers((t) => t.map((row, i) => (i === idx ? { ...row, [key]: value } : row)));

  const savePricing = async () => {
    const cleaned = [];
    for (const t of tiers) {
      const minQty = Number(t.minQty);
      const price = Number(t.price);
      if (t.minQty === "" || t.price === "") continue; // skip blank rows
      if (Number.isNaN(minQty) || minQty < 1) {
        toast.error("Units must be a number of at least 1");
        return;
      }
      if (Number.isNaN(price) || price < 0) {
        toast.error("Price must be a valid non-negative number");
        return;
      }
      cleaned.push({ minQty, price });
    }
    cleaned.sort((a, b) => a.minQty - b.minQty);

    setSavingTiers(true);
    try {
      const res = await updateProduct(pricingProduct.productId, {
        bulkPricing: cleaned,
      });
      const updated = res?.data?.data;
      setProducts((list) =>
        list.map((p) =>
          p.productId === pricingProduct.productId
            ? { ...p, bulkPricing: updated?.bulkPricing ?? cleaned }
            : p
        )
      );
      toast.success("Bulk pricing saved");
      closePricing();
    } catch (err) {
      toast.error(err.message || "Failed to save bulk pricing");
    } finally {
      setSavingTiers(false);
    }
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error("Product name is required");
      return;
    }
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("name", form.name.trim());
      fd.append("slug", form.slug.trim());
      fd.append("hsnCode", form.hsnCode.trim());
      if (form.gstPercentage !== "" && form.gstPercentage !== null) {
        fd.append("gstPercentage", form.gstPercentage);
      }
      fd.append("isActive", form.isActive);
      if (thumbFile) fd.append("thumbnail", thumbFile);
      fd.append("existingImages", JSON.stringify(existingImages));
      newImages.forEach((n) => fd.append("images", n.file));

      const res = await updateProduct(editing.productId, fd);
      const updated = res?.data?.data;
      setProducts((list) =>
        list.map((p) =>
          p.productId === editing.productId ? { ...p, ...(updated || {}) } : p
        )
      );
      toast.success("Product updated successfully");
      closeEdit();
    } catch (err) {
      toast.error(err.message || "Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-full bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
            <Package size={20} />
          </span>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Products</h1>
            <p className="text-sm text-slate-500">
              All products in the catalog{" "}
              {!loading && (
                <span className="font-medium text-slate-600">
                  ({filtered.length})
                </span>
              )}
            </p>
          </div>
        </div>
        <div className="w-full max-w-sm">
          <SEARCH
            value={query}
            onChange={setQuery}
            placeholder="Search by name, brand or category…"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead className="bg-gray-50 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Brand</th>
                <th className="px-4 py-3">HSN</th>
                <th className="px-4 py-3">GST %</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-slate-400">
                    <Loader2 size={20} className="mx-auto animate-spin" />
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-slate-400">
                    No products found.
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.productId} className="text-slate-700">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {p.thumbnail ? (
                          <img
                            src={p.thumbnail}
                            alt={p.name}
                            className="h-10 w-10 rounded-lg object-cover"
                          />
                        ) : (
                          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
                            <ImageIcon size={16} />
                          </span>
                        )}
                        <div>
                          <p className="font-semibold text-slate-800">{p.name}</p>
                          <p className="text-xs text-slate-400">{p.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">{p.category?.name || "—"}</td>
                    <td className="px-4 py-3">{p.brand?.name || "—"}</td>
                    <td className="px-4 py-3">{p.hsnCode || "—"}</td>
                    <td className="px-4 py-3">
                      {p.gstPercentage != null ? `${p.gstPercentage}%` : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                          p.isActive
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {p.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openView(p)}
                          title="View details"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        >
                          <Eye size={13} /> View
                        </button>
                        <button
                          type="button"
                          onClick={() => openPricing(p)}
                          title="Bulk pricing"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        >
                          <Layers size={13} /> Bulk Pricing
                        </button>
                        <button
                          type="button"
                          onClick={() => openEdit(p)}
                          title="Edit product"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        >
                          <Pencil size={13} /> Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Edit Product</h2>
                <p className="text-xs text-slate-500">{editing.name}</p>
              </div>
              <button
                type="button"
                onClick={closeEdit}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 px-6 py-5 sm:grid-cols-2">
              <Field label="Name" name="name" value={form.name} onChange={handleChange} />
              <Field label="Slug" name="slug" value={form.slug} onChange={handleChange} />
              <Field label="HSN Code" name="hsnCode" value={form.hsnCode} onChange={handleChange} />
              <Field
                label="GST %"
                name="gstPercentage"
                type="number"
                value={form.gstPercentage}
                onChange={handleChange}
              />

              {/* Thumbnail */}
              <div className="sm:col-span-2">
                <span className="mb-1.5 block text-xs font-semibold text-slate-600">
                  Thumbnail
                </span>
                <div className="flex items-center gap-4">
                  <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                    {thumbPreview || thumbUrl ? (
                      <img
                        src={thumbPreview || thumbUrl}
                        alt="thumbnail"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImageIcon size={22} className="text-slate-300" />
                    )}
                  </div>
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 px-3.5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                    <Upload size={15} />
                    {thumbPreview || thumbUrl ? "Change image" : "Upload image"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleThumbChange}
                    />
                  </label>
                </div>
              </div>

              {/* Gallery images */}
              <div className="sm:col-span-2">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600">
                    Images
                  </span>
                  <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50">
                    <Upload size={13} /> Add images
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImagesChange}
                    />
                  </label>
                </div>

                {existingImages.length === 0 && newImages.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-6 text-center text-xs text-slate-400">
                    No images. Upload to display them here.
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {existingImages.map((url) => (
                      <ImageThumb
                        key={url}
                        src={url}
                        onRemove={() => removeExistingImage(url)}
                      />
                    ))}
                    {newImages.map((n, idx) => (
                      <ImageThumb
                        key={n.preview}
                        src={n.preview}
                        badge="new"
                        onRemove={() => removeNewImage(idx)}
                      />
                    ))}
                  </div>
                )}
              </div>

              <label className="flex items-center gap-2 sm:col-span-2">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-200"
                />
                <span className="text-sm font-medium text-slate-700">Active</span>
              </label>
            </div>

            <div className="sticky bottom-0 flex justify-end gap-3 border-t border-gray-100 bg-white px-6 py-4">
              <button
                type="button"
                onClick={closeEdit}
                className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
              >
                {saving && <Loader2 size={15} className="animate-spin" />}
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk pricing modal */}
      {pricingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white">
                  <Layers size={16} />
                </span>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Bulk Pricing</h2>
                  <p className="text-xs text-slate-500">{pricingProduct.name}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={closePricing}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-6 py-5">
              <p className="mb-4 rounded-xl bg-sky-50 px-3.5 py-2.5 text-xs text-sky-700">
                Set a price per unit for each quantity tier. e.g. 1 unit = ₹7,
                buy 100+ = ₹6, buy 1000+ = ₹5.
              </p>

              <div className="grid grid-cols-[1fr_1fr_auto] items-center gap-3 pb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                <span>Units (min qty)</span>
                <span>Price / unit</span>
                <span />
              </div>

              <div className="space-y-2.5">
                {tiers.map((row, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-[1fr_1fr_auto] items-center gap-3"
                  >
                    <input
                      type="number"
                      min={1}
                      value={row.minQty}
                      onChange={(e) => updateTier(idx, "minQty", e.target.value)}
                      placeholder="e.g. 100"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm outline-none focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-100"
                    />
                    <div className="relative">
                      <IndianRupee
                        size={14}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      />
                      <input
                        type="number"
                        min={0}
                        value={row.price}
                        onChange={(e) => updateTier(idx, "price", e.target.value)}
                        placeholder="e.g. 6"
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-8 pr-3.5 text-sm outline-none focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-100"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeTier(idx)}
                      title="Remove tier"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-slate-400 hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addTier}
                className="mt-3 inline-flex items-center gap-1.5 rounded-xl border border-dashed border-gray-300 px-3.5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                <Plus size={15} /> Add tier
              </button>
            </div>

            <div className="sticky bottom-0 flex justify-end gap-3 border-t border-gray-100 bg-white px-6 py-4">
              <button
                type="button"
                onClick={closePricing}
                className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={savePricing}
                disabled={savingTiers}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
              >
                {savingTiers && <Loader2 size={15} className="animate-spin" />}
                Save pricing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View details modal */}
      {viewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
              <div className="flex items-center gap-3">
                {viewProduct.thumbnail ? (
                  <img
                    src={viewProduct.thumbnail}
                    alt={viewProduct.name}
                    className="h-11 w-11 rounded-lg object-cover"
                  />
                ) : (
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
                    <ImageIcon size={18} />
                  </span>
                )}
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {viewProduct.name}
                  </h2>
                  <p className="text-xs text-slate-500">{viewProduct.slug}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeView}
                className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            {loadingView ? (
              <div className="px-6 py-16 text-center text-slate-400">
                <Loader2 size={22} className="mx-auto animate-spin" />
              </div>
            ) : !viewDetails ? (
              <div className="px-6 py-16 text-center text-sm text-slate-400">
                Could not load details.
              </div>
            ) : (
              <div className="px-6 py-5">
                {/* Product meta */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <MetaCell label="Category" value={viewDetails.category?.name} />
                  <MetaCell label="Brand" value={viewDetails.brand?.name} />
                  <MetaCell label="HSN" value={viewDetails.hsnCode} />
                  <MetaCell
                    label="GST %"
                    value={
                      viewDetails.gstPercentage != null
                        ? `${viewDetails.gstPercentage}%`
                        : "—"
                    }
                  />
                </div>

                {/* Summary stats */}
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <StatCard
                    icon={<Store size={16} />}
                    label="Vendors"
                    value={viewDetails.summary?.vendorCount ?? 0}
                  />
                  <StatCard
                    icon={<Boxes size={16} />}
                    label="Total stock"
                    value={viewDetails.summary?.totalStock ?? 0}
                  />
                  <StatCard
                    icon={<IndianRupee size={16} />}
                    label="Lowest price"
                    value={formatMoney(viewDetails.summary?.lowestPrice)}
                  />
                  <StatCard
                    icon={<IndianRupee size={16} />}
                    label="Highest price"
                    value={formatMoney(viewDetails.summary?.highestPrice)}
                  />
                </div>

                {/* Vendors table */}
                <div className="mt-6">
                  <h3 className="mb-2 text-sm font-bold text-slate-800">
                    Vendors offering this product
                  </h3>
                  {viewDetails.vendors?.length ? (
                    <div className="overflow-hidden rounded-xl border border-gray-200">
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[640px] text-left text-sm">
                          <thead className="bg-gray-50 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                            <tr>
                              <th className="px-4 py-2.5">Vendor</th>
                              <th className="px-4 py-2.5">Warehouse</th>
                              <th className="px-4 py-2.5 text-right">MRP</th>
                              <th className="px-4 py-2.5 text-right">Selling</th>
                              <th className="px-4 py-2.5 text-right">Stock</th>
                              <th className="px-4 py-2.5">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {viewDetails.vendors.map((v) => (
                              <tr key={v.listingId} className="text-slate-700">
                                <td className="px-4 py-2.5">
                                  <p className="font-semibold text-slate-800">
                                    {v.vendorName}
                                  </p>
                                  {v.vendorSku && (
                                    <p className="text-xs text-slate-400">
                                      SKU: {v.vendorSku}
                                    </p>
                                  )}
                                </td>
                                <td className="px-4 py-2.5">
                                  {v.warehouse?.name ? (
                                    <span className="inline-flex items-center gap-1 text-xs text-slate-600">
                                      <MapPin size={12} /> {v.warehouse.name}
                                    </span>
                                  ) : (
                                    <span className="text-slate-400">—</span>
                                  )}
                                </td>
                                <td className="px-4 py-2.5 text-right text-slate-500">
                                  {formatMoney(v.mrp)}
                                </td>
                                <td className="px-4 py-2.5 text-right font-semibold text-slate-900">
                                  {formatMoney(v.sellingPrice)}
                                </td>
                                <td className="px-4 py-2.5 text-right">
                                  {v.stockQuantity}
                                </td>
                                <td className="px-4 py-2.5">
                                  <span
                                    className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                                      v.stockQuantity > 0
                                        ? "bg-emerald-50 text-emerald-600"
                                        : "bg-red-50 text-red-600"
                                    }`}
                                  >
                                    {v.stockQuantity > 0
                                      ? "In stock"
                                      : "Out of stock"}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 px-4 py-8 text-center text-sm text-slate-400">
                      No vendors have listed this product yet.
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="sticky bottom-0 flex justify-end border-t border-gray-100 bg-white px-6 py-4">
              <button
                type="button"
                onClick={closeView}
                className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function formatMoney(value) {
  if (value == null || Number.isNaN(Number(value))) return "—";
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

function MetaCell({ label, value }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 px-3.5 py-2.5">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-semibold text-slate-800">
        {value || "—"}
      </p>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3.5 py-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white">
        {icon}
      </span>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>
        <p className="text-base font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function ImageThumb({ src, onRemove, badge }) {
  return (
    <div className="group relative h-20 w-20 overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
      <img src={src} alt="product" className="h-full w-full object-cover" />
      {badge && (
        <span className="absolute left-1 top-1 rounded bg-sky-600 px-1.5 py-0.5 text-[9px] font-bold uppercase text-white">
          {badge}
        </span>
      )}
      <button
        type="button"
        onClick={onRemove}
        title="Remove image"
        className="absolute right-1 top-1 inline-flex h-6 w-6 items-center justify-center rounded-md bg-white/90 text-red-500 shadow-sm hover:bg-white hover:text-red-600"
      >
        <Trash2 size={13} />
      </button>
    </div>
  );
}

function Field({ label, name, value, onChange, type = "text", className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-semibold text-slate-600">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-sm outline-none focus:border-sky-300 focus:bg-white focus:ring-2 focus:ring-sky-100"
      />
    </label>
  );
}

export default Catalog_B;
