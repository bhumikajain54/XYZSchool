import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiSave, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

export default function AddInventoryItem() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: 'Stationery',
    quantity: '',
    price: '',
    status: 'In Stock',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API Call
    await new Promise(r => setTimeout(r, 1200));
    setIsLoading(false);
    setIsSuccess(true);
    setTimeout(() => navigate('/admin/inventory'), 1500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center animate-in fade-in zoom-in">
        <div className="w-16 h-16 bg-emerald-50 text-secondary rounded-full flex items-center justify-center mb-4">
          <FiCheckCircle className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Item Added!</h2>
        <p className="text-slate-500 mt-2">The new inventory record has been saved successfully.</p>
        <button onClick={() => navigate('/admin/inventory')} className="mt-6 font-semibold text-primary hover:text-indigo-700 transition">
          Return to Inventory List
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/admin/inventory')}
          className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition shadow-sm"
        >
          <FiArrowLeft />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 font-inter">Add Inventory Item</h1>
          <p className="text-slate-500 font-inter">Register a new asset or supply item in the system</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-2xl overflow-hidden animate-in slide-in-from-bottom-4">
        <div className="p-1 px-8 bg-slate-50 border-bottom border-slate-100 mb-6" />
        <form onSubmit={handleSubmit} className="p-8 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-full">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Item Name</label>
              <input 
                name="name" 
                type="text" 
                className="w-full h-10 px-4 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                placeholder="e.g. Dell Latitude 5420"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Category</label>
              <select 
                 name="category"
                 className="w-full h-10 px-4 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 cursor-pointer"
                 value={formData.category}
                 onChange={handleInputChange}
              >
                <option value="Stationery">Stationery</option>
                <option value="Lab Equipment">Lab Equipment</option>
                <option value="Sports">Sports</option>
                <option value="IT Assets">IT Assets</option>
                <option value="Furniture">Furniture</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Quantity</label>
              <input 
                name="quantity" 
                type="number" 
                className="w-full h-10 px-4 border border-slate-200 rounded-lg outline-none focus:border-indigo-500"
                placeholder="0"
                value={formData.quantity}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Unit Price (₹)</label>
              <input 
                name="price" 
                type="number" 
                className="w-full h-10 px-4 border border-slate-200 rounded-lg outline-none focus:border-indigo-500"
                placeholder="0.00"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Initial Status</label>
              <select 
                 name="status"
                 className="w-full h-10 px-4 border border-slate-200 rounded-lg outline-none focus:border-indigo-500 cursor-pointer"
                 value={formData.status}
                 onChange={handleInputChange}
              >
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Ordered">Ordered</option>
              </select>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-end gap-4 border-t border-slate-100 pt-6">
            <button 
              type="button" 
              onClick={() => navigate('/admin/inventory')}
              className="px-6 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className={`flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 ${isLoading ? 'opacity-70 pointer-events-none' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <FiSave /> Add to Inventory
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6 max-w-2xl bg-amber-50 border border-amber-100 p-4 rounded-xl flex gap-4 text-amber-700">
        <FiAlertCircle className="shrink-0 mt-1" />
        <p className="text-sm">
          Please verify the quantities and categories carefully. Assets once registered will be tracked in monthly audits.
        </p>
      </div>
    </div>
  );
}
