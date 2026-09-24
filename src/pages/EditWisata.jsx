import { useState, useEffect } from "react";
import { useNavigate, useParams  } from "react-router-dom";

export default function EditWisata() {
    const navigate = useNavigate();
    const { id } = useParams();
        const [formData, setFormData] = useState({
        nama_wisata: "",
        deskripsi: "",
        harga_tiket: "",
        id_kategori: "",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3001/wisata/${id}`)
        .then((res) => res.json())
        .then((data) => {
            setFormData(data[0]); // ambil data pertama hasil query
            setLoading(false);
        })
        .catch((err) => console.error(err));
    }, [id]);

    const handleChange = (e) => {
        setFormData({... formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch(`http://localhost:3001/wisata/${id}`, {
            method : "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const konfrimasi = window.confirm(
            "Yakin ingin menyimpan perubahan ini?"
        );

        if (!konfrimasi) {
            return;
        }

        alert("Wisata berhasil diperbarui!");
        navigate("/wisata");
    };

    if (loading) {
        return <div className="container mt-4">Loading...</div>
    }

    return (
        <div className="conatiner mt-4">
            <h2>Edit Wisata</h2>
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="mb-3">
                    <label className="form-label">Nama Wisata</label>
                    <input
                        type="text"
                        name="nama_wisata"
                        value={formData.nama_wisata}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-success me-2">
                    Simpan Perubahan
                </button>
            </form>
        </div>
    );
}