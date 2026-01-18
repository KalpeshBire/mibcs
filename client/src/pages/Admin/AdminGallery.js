import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { api } from '../../utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Trash2,
    Image as ImageIcon,
    Loader,
    X,
    Upload
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminGallery = () => {
    const queryClient = useQueryClient();
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch Gallery Images
    const { data: images = [], isLoading } = useQuery('gallery-images', () =>
        api.get('/gallery').then(res => res.data)
    );

    // Upload Mutation
    const uploadMutation = useMutation(
        (formData) => api.post('/gallery', formData),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('gallery-images');
                setIsUploadModalOpen(false);
                resetForm();
                toast.success('Image uploaded successfully');
            },
            onError: (error) => {
                toast.error(error.response?.data?.message || 'Failed to upload image');
            }
        }
    );

    // Delete Mutation
    const deleteMutation = useMutation(
        (id) => api.delete(`/gallery/${id}`),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('gallery-images');
                toast.success('Image deleted successfully');
            },
            onError: (error) => {
                toast.error('Failed to delete image');
            }
        }
    );

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!selectedFile) return;

        setIsSubmitting(true);
        const formData = new FormData();
        formData.append('image', selectedFile);
        if (title) formData.append('title', title);
        if (category) formData.append('category', category);

        try {
            await uploadMutation.mutateAsync(formData);
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setSelectedFile(null);
        setPreviewUrl('');
        setTitle('');
        setCategory('');
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader className="w-8 h-8 text-cyan-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Gallery Management</h2>
                    <p className="text-gray-400">Manage images for the gallery section</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsUploadModalOpen(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all shadow-lg shadow-cyan-500/25"
                >
                    <Plus size={20} />
                    <span>Upload Image</span>
                </motion.button>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <AnimatePresence>
                    {images.map((img) => (
                        <motion.div
                            key={img._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            layout
                            className="group relative aspect-square bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-cyan-500/50 transition-colors"
                        >
                            <img
                                src={img.image.url}
                                alt={img.title || 'Gallery Image'}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                {img.title && (
                                    <p className="text-white font-medium text-sm truncate mb-1">{img.title}</p>
                                )}
                                <div className="flex justify-end mt-2">
                                    <button
                                        onClick={() => {
                                            if (window.confirm('Are you sure you want to delete this image?')) {
                                                deleteMutation.mutate(img._id);
                                            }
                                        }}
                                        className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {images.length === 0 && (
                <div className="text-center py-20 text-gray-500 bg-gray-900/50 rounded-2xl border border-gray-800 border-dashed">
                    <ImageIcon size={48} className="mx-auto mb-4 opacity-50" />
                    <p>No images in gallery yet</p>
                </div>
            )}

            {/* Upload Modal */}
            <AnimatePresence>
                {isUploadModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setIsUploadModalOpen(false)}
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-white">Upload Image</h3>
                                <button
                                    onClick={() => setIsUploadModalOpen(false)}
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleUpload} className="space-y-4">
                                {/* Image Drop Area */}
                                <div
                                    className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${previewUrl ? 'border-cyan-500/50 bg-cyan-500/5' : 'border-gray-700 hover:border-gray-600 bg-gray-800/50'
                                        }`}
                                >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileSelect}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />

                                    {previewUrl ? (
                                        <div className="relative aspect-video rounded-lg overflow-hidden">
                                            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 text-cyan-500 mb-2">
                                                <Upload size={24} />
                                            </div>
                                            <p className="text-sm text-gray-400">
                                                <span className="text-cyan-500 font-medium">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Title (Optional)</label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                                        placeholder="Image title"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={!selectedFile || isSubmitting}
                                    className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader size={20} className="animate-spin" />
                                            <span>Uploading...</span>
                                        </>
                                    ) : (
                                        <span>Upload Image</span>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminGallery;
