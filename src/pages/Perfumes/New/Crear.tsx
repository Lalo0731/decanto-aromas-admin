// src/pages/Perfumes/New/Crear.tsx
import React, { useState } from "react";
import "../../../styles/pages/perfumesNew.scss";
import { createPerfume, uploadPerfumeImages } from "../../../services/perfumes";
import { showSuccess, showError, showWarning } from "../../../utils/alerts";

const CrearPerfumeNuevo: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState("");
  const [decantsUnicamente, setDecantsUnicamente] = useState(false);
  const [precioDecants, setPrecioDecants] = useState("");
  const [decants, setDecants] = useState(false);
  const [nuevo, setNuevo] = useState(false);
  const [disponible, setDisponible] = useState(false);
  const [acordes, setAcordes] = useState("");
  const [especialPara, setEspecialPara] = useState("");
  const [imagenes, setImagenes] = useState<FileList | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre || !descripcion || !precio) {
      showWarning("Todos los campos son obligatorios");
      return;
    }

    try {
      // Construimos el objeto con nombres correctos
      const payload = {
        name: nombre,
        description: descripcion,
        category: categoria,
        price: Number(precio),
        isDecantOnly: decantsUnicamente,
        priceDecant: decants ? Number(precioDecants) : null,
        isDecant: decants,
        isNew: nuevo,
        available: disponible,
        accords: acordes
          ? acordes.split(",").map((a) => ({ accord: a.trim() })) 
          : [],
        specialFor: especialPara
          ? especialPara.split(",").map((s) => ({ context: s.trim() })) 
          : [],
        images: []
      };

      const response = await createPerfume(payload);
      const perfumeId = response.data.id;

      if(imagenes && perfumeId){
        await uploadPerfumeImages(perfumeId, imagenes);
      }

      console.log("Data img",response.data);
      showSuccess("Perfume Nuevo creado con éxito");

      // limpiar
      setNombre("");
      setDescripcion("");
      setCategoria("");
      setPrecio("");
      setDecantsUnicamente(false);
      setPrecioDecants("");
      setDecants(false);
      setNuevo(false);
      setDisponible(false);
      setAcordes("");
      setEspecialPara("");
      setImagenes(null);
    } catch (error: any){
      console.log("Error al crear perfume nuevo", error);
      showError("Error al crear el cliente");
    }
  };

  return (
    <div className="perfumes-page">
      <h2>Crear Perfume Nuevo</h2>
      <form className="perfumes-form" onSubmit={handleSubmit}>
        {/* Nombre */}
        <div className="perfumes-form__group">
          <label>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        {/* Descripción */}
        <div className="perfumes-form__group full-width">
          <label>Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>

        {/* Categoría */}
        <div className="perfumes-form__group">
          <label>Categoría</label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="">Selecciona una opción</option>
            <option value="arabe">Árabes</option>
            <option value="diseñador">Diseñador</option>
            <option value="next">Nuevos</option>
          </select>
        </div>

        {/* Precio */}
        <div className="perfumes-form__group">
          <label>Precio</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
        </div>

        {/* Decants */}
        <div className="perfumes-form__group">
          <label>Decants</label>
          <select
            value={decants ? "true" : "false"}
            onChange={(e) => setDecants(e.target.value === "true")}
          >
            <option value="false">No</option>
            <option value="true">Sí</option>
          </select>
        </div>

        {/* Precio Decants */}
        {decants && (
            <div className="perfumes-form__group">
                <label>Precio Decants</label>
                <input
                    type="number"
                    value={precioDecants}
                    onChange={(e) => setPrecioDecants(e.target.value)}
                />
            </div>
        )}

        {/* Únicamente Decants */}
        {decants && (
            <div className="perfumes-form__group">
                <label>¿Únicamente Decants?</label>
                <select
                    value={decantsUnicamente ? "true" : "false"}
                    onChange={(e) => setDecantsUnicamente(e.target.value === "true")}
                >
                    <option value="false">No</option>
                    <option value="true">Sí</option>
                </select>
            </div>
          
        )}

        {/* Nuevo */}
        <div className="perfumes-form__group">
          <label>¿Es Nuevo?</label>
          <select
            value={nuevo ? "true" : "false"}
            onChange={(e) => setNuevo(e.target.value === "true")}
          >
            <option value="false">No</option>
            <option value="true">Sí</option>
          </select>
        </div>

        {/* Disponible */}
        <div className="perfumes-form__group">
          <label>¿Disponible?</label>
          <select
            value={disponible ? "true" : "false"}
            onChange={(e) => setDisponible(e.target.value === "true")}
          >
            <option value="false">No</option>
            <option value="true">Sí</option>
          </select>
        </div>

        {/* Acordes principales */}
        <div className="perfumes-form__group full-width">
          <label>Acordes principales</label>
          <textarea
            value={acordes}
            onChange={(e) => setAcordes(e.target.value)}
            placeholder="Ejemplo: Amaderado, Floral, Dulce..."
          />
        </div>
        
        {/* Especial para */}
        <div className="perfumes-form__group full-width">
          <label>Especial para</label>
          <textarea
            value={especialPara}
            onChange={(e) => setEspecialPara(e.target.value)}
            placeholder="Ejemplo: Día, Noche, Invierno, Primavera..."
          />
        </div>

        {/* Subir imágenes */}
        <div className="perfumes-form__group full-width">
          <label>Subir imágenes (1 a 3)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImagenes(e.target.files)}
          />
        </div>

        <div className="perfumes-form__actions full-width">
          <button type="submit" className="perfumes-btn">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearPerfumeNuevo;
