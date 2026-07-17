import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, FileText, ImageOff } from "lucide-react";
import apiClient from "../../api/axios";
import { B_CARD } from "../../components/basicComponents/Card";
import { H1 } from "../../components/basicComponents/Heading";
import { toast } from "../../components/basicComponents/TostMessage";

const DOC_LABELS = {
  gstCert: "GST Certificate",
  panCard: "PAN Card",
  cancelledCheque: "Cancelled Cheque",
  msmeUdyam: "MSME / Udyam",
  shopAndTradeLicense: "Shop & Trade License",
  ownerAadhaarDoc: "Owner Aadhaar",
  oribrixSellerAgreement: "Seller Agreement",
  iso9001: "ISO 9001",
};

const DOC_STATUSES = [
  "PENDING",
  "RECEIVED",
  "APPROVED",
  "RE-UPLOAD_REQUESTED",
  "REJECTED",
];

const VENDOR_STATUSES = [
  "PENDING_VERIFICATION",
  "APPROVED",
  "REJECTED",
  "SUSPENDED",
];

function statusClass(status = "") {
  const value = String(status).toUpperCase();
  if (value === "PENDING_VERIFICATION" || value === "PENDING") {
    return "bg-amber-50 text-amber-700 border-amber-200";
  }
  if (value === "APPROVED" || value === "ACCEPTED" || value === "RECEIVED") {
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  }
  if (value === "REJECTED" || value === "RE-UPLOAD_REQUESTED") {
    return "bg-red-50 text-red-700 border-red-200";
  }
  if (value === "SUSPENDED") {
    return "bg-slate-100 text-slate-700 border-slate-200";
  }
  return "bg-blue-50 text-blue-700 border-blue-200";
}

function isImageUrl(url = "") {
  if (!url) return false;
  const clean = url.split("?")[0].toLowerCase();
  return /\.(png|jpe?g|gif|webp|bmp|svg)$/.test(clean) || clean.includes("/image/");
}

function isPdfUrl(url = "") {
  if (!url) return false;
  return url.split("?")[0].toLowerCase().endsWith(".pdf") || url.toLowerCase().includes("application/pdf");
}

function Field({ label, value }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-slate-800 break-words">
        {value || "-"}
      </p>
    </div>
  );
}

function Section({ title, children, className = "" }) {
  return (
    <section
      className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}
    >
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </h2>
      {children}
    </section>
  );
}

function DocumentCard({ label, docKey, doc, onStatusChange, saving }) {
  const fileUrl = doc?.fileUrl || "";
  const showImage = fileUrl && isImageUrl(fileUrl);
  const showPdf = fileUrl && isPdfUrl(fileUrl);
  const [docStatus, setDocStatus] = useState(doc?.status || "PENDING");
  const [remarks, setRemarks] = useState(doc?.remarks || "");

  useEffect(() => {
    setDocStatus(doc?.status || "PENDING");
    setRemarks(doc?.remarks || "");
  }, [doc?.status, doc?.remarks]);

  const isDirty =
    docStatus !== (doc?.status || "PENDING") ||
    remarks !== (doc?.remarks || "");

  return (
    <div className="overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
      <div className="relative aspect-[4/3] bg-slate-100">
        {showImage ? (
          <a href={fileUrl} target="_blank" rel="noreferrer" className="block h-full w-full">
            <img
              src={fileUrl}
              alt={label}
              className="h-full w-full object-contain p-2"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextSibling?.classList.remove("hidden");
              }}
            />
            <div className="hidden absolute inset-0 flex flex-col items-center justify-center gap-2 text-slate-400">
              <ImageOff size={22} />
              <span className="text-xs">Preview unavailable</span>
            </div>
          </a>
        ) : showPdf ? (
          <a
            href={fileUrl}
            target="_blank"
            rel="noreferrer"
            className="flex h-full w-full flex-col items-center justify-center gap-2 text-slate-500 hover:bg-slate-100"
          >
            <FileText size={28} />
            <span className="text-xs font-medium">PDF document · click to open</span>
          </a>
        ) : fileUrl ? (
          <a
            href={fileUrl}
            target="_blank"
            rel="noreferrer"
            className="flex h-full w-full flex-col items-center justify-center gap-2 text-slate-500 hover:bg-slate-100"
          >
            <FileText size={28} />
            <span className="text-xs font-medium">Open file</span>
          </a>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-slate-400">
            <ImageOff size={22} />
            <span className="text-xs">No document uploaded</span>
          </div>
        )}
      </div>

      <div className="space-y-2 border-t border-slate-100 bg-white px-3 py-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-slate-800">{label}</p>
            <span
              className={`mt-1 inline-flex rounded-full border px-2 py-0.5 text-[10px] font-semibold ${statusClass(
                doc?.status
              )}`}
            >
              {doc?.status || "PENDING"}
            </span>
          </div>

          {fileUrl ? (
            <a
              href={fileUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              Open
              <ExternalLink size={12} />
            </a>
          ) : null}
        </div>

        <select
          value={docStatus}
          onChange={(e) => setDocStatus(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs font-medium text-slate-700 outline-none focus:border-slate-300 focus:bg-white"
        >
          {DOC_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <input
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
          placeholder="Remarks (optional)"
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs text-slate-700 outline-none placeholder:text-slate-400 focus:border-slate-300 focus:bg-white"
        />

        <button
          type="button"
          disabled={saving || !isDirty}
          onClick={() => onStatusChange(docKey, docStatus, remarks)}
          className="w-full rounded-lg bg-slate-900 px-2 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Saving..." : "Update doc status"}
        </button>
      </div>
    </div>
  );
}

function KYCLifeCycleFullDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [savingStatus, setSavingStatus] = useState(false);
  const [savingDocKey, setSavingDocKey] = useState("");

  useEffect(() => {
    if (!id) return;

    const controller = new AbortController();

    const fetchVendorDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await apiClient.get(`/api/admin/v1/vendor/${id}`, {
          signal: controller.signal,
        });

        const data = response.data?.data || null;
        setVendor(data);
        setSelectedStatus(data?.status || "PENDING_VERIFICATION");
      } catch (err) {
        if (err.name !== "CanceledError") {
          setError(err.message || "Failed to fetch vendor details");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVendorDetails();
    return () => controller.abort();
  }, [id]);

  const handleStatusUpdate = async () => {
    if (!id || !selectedStatus) return;
    if (selectedStatus === vendor?.status) {
      toast.info("Status is already up to date.");
      return;
    }

    try {
      setSavingStatus(true);
      const response = await apiClient.patch(`/api/admin/v1/vendor/${id}`, {
        status: selectedStatus,
      });

      const updated = response.data?.data || null;
      setVendor(updated);
      setSelectedStatus(updated?.status || selectedStatus);
      toast.success(response.data?.message || "Vendor status updated successfully.");
    } catch (err) {
      toast.error(err.message || "Failed to update vendor status.");
    } finally {
      setSavingStatus(false);
    }
  };

  const handleDocStatusUpdate = async (docKey, status, remarks) => {
    if (!id || !docKey) return;

    try {
      setSavingDocKey(docKey);
      const response = await apiClient.patch(`/api/admin/v1/vendor/${id}`, {
        kycDocuments: {
          [docKey]: {
            status,
            remarks,
          },
        },
      });

      const updated = response.data?.data || null;
      setVendor(updated);
      if (updated?.status) setSelectedStatus(updated.status);
      toast.success(`${DOC_LABELS[docKey] || docKey} status updated.`);
    } catch (err) {
      toast.error(err.message || "Failed to update document status.");
    } finally {
      setSavingDocKey("");
    }
  };

  const business = vendor?.businessDetails || {};
  const owner = vendor?.ownerDetails || {};
  const bank = vendor?.bankDetails || {};
  const docs = vendor?.kycDocuments || {};

  return (
    <B_CARD>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <button
            type="button"
            onClick={() => navigate("/kyc")}
            className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800"
          >
            <ArrowLeft size={16} />
            Back to KYC Lifecycle
          </button>

          <H1 className="mb-1">
            {business.legalBusinessName || owner.fullName || "Vendor details"}
          </H1>
          <p className="text-sm text-slate-500">
            Full KYC application · vendor ID {id}
          </p>
        </div>

        {vendor ? (
          <div className="flex w-full flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:w-auto sm:min-w-[280px]">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Vendor status
              </p>
              <span
                className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${statusClass(
                  vendor.status
                )}`}
              >
                {vendor.status}
              </span>
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-800 outline-none focus:border-slate-300 focus:bg-white focus:ring-2 focus:ring-slate-100"
            >
              {VENDOR_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <button
              type="button"
              disabled={savingStatus || selectedStatus === vendor.status}
              onClick={handleStatusUpdate}
              className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {savingStatus ? "Updating..." : "Update status"}
            </button>
          </div>
        ) : null}
      </div>

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
          Loading vendor details...
        </div>
      ) : null}

      {error ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {!loading && !error && vendor ? (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <Section title="Owner details">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Full name" value={owner.fullName || vendor.owner?.fullName} />
              <Field label="Email" value={owner.email || vendor.owner?.email} />
              <Field label="Mobile" value={owner.mobile || vendor.owner?.mobile} />
              <Field label="Designation" value={owner.designation} />
              <Field label="Owner Aadhaar" value={owner.ownerAadhaar} />
              <Field label="Owner PAN" value={owner.ownerPan} />
            </div>
          </Section>

          <Section title="Business details">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Legal business name" value={business.legalBusinessName} />
              <Field label="Trade name" value={business.tradeName} />
              <Field label="Entity type" value={business.entityType} />
              <Field label="GSTIN" value={business.gstin} />
              <Field label="PAN" value={business.pan} />
              <Field label="CIN" value={business.cin} />
              <Field label="Year established" value={business.yearEstablished} />
              <Field label="Registered address" value={business.registeredAddress} />
            </div>
          </Section>

          <Section title="Bank details">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Account holder" value={bank.accountHolder} />
              <Field label="Bank name" value={bank.bankName} />
              <Field label="Account number" value={bank.accountNumber} />
              <Field label="IFSC" value={bank.ifsc} />
              <Field label="Branch" value={bank.branch} />
              <Field label="Account type" value={bank.accountType} />
            </div>
          </Section>

          <Section title="Categories & warehouses">
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Product categories
                </p>
                <div className="flex flex-wrap gap-2">
                  {(vendor.productCategories || []).length ? (
                    vendor.productCategories.map((cat) => (
                      <span
                        key={cat.categoryId || cat.name}
                        className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700"
                      >
                        {cat.name || "-"}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500">No categories</p>
                  )}
                </div>
              </div>

              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Warehouses
                </p>
                {(vendor.warehouses || []).length ? (
                  <div className="space-y-2">
                    {vendor.warehouses.map((w) => (
                      <div
                        key={w.warehouseId}
                        className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2"
                      >
                        <p className="text-sm font-semibold text-slate-800">
                          {w.name || "-"}
                        </p>
                        <p className="text-xs text-slate-500">
                          {w.address || "-"} · {w.capacity || "-"} ·{" "}
                          {w.operatingHours || "-"}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">No warehouses</p>
                )}
              </div>
            </div>
          </Section>

          <Section title="KYC documents" className="xl:col-span-2">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {Object.entries(DOC_LABELS).map(([key, label]) => (
                <DocumentCard
                  key={key}
                  docKey={key}
                  label={label}
                  doc={docs[key] || {}}
                  saving={savingDocKey === key}
                  onStatusChange={handleDocStatusUpdate}
                />
              ))}
            </div>
          </Section>
        </div>
      ) : null}
    </B_CARD>
  );
}

export default KYCLifeCycleFullDetails;
