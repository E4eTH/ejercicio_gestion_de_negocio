export const uploadImage = async (file) => {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const upload_preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    // 1. Obtener la firma del backend
    // Nota: En producción, cambia esta URL a tu servidor real
    const signatureRes = await fetch('http://localhost:3001/api/sign-cloudinary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ timestamp, upload_preset })
    });

    if (!signatureRes.ok) {
        throw new Error('Error al obtener la firma de Cloudinary');
    }

    const { signature, apiKey, cloudName } = await signatureRes.json();

    // 2. Subir a Cloudinary con la firma
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', apiKey);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);
    formData.append('upload_preset', upload_preset);

    const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: 'POST', body: formData }
    );

    const data = await res.json();
    
    if (data.error) {
        throw new Error(data.error.message);
    }

    return data.secure_url;
};