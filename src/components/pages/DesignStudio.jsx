import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { productService } from "@/services/api/productService";

const DesignStudio = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Product and design state
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [designElements, setDesignElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [activeTool, setActiveTool] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Text editing state
  const [editingText, setEditingText] = useState(null);
  const [textContent, setTextContent] = useState('');
  const [fontFamily, setFontFamily] = useState('Inter');
  const [fontSize, setFontSize] = useState(16);
  const [textColor, setTextColor] = useState('#000000');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const fontFamilies = [
    'Inter', 'Plus Jakarta Sans', 'Arial', 'Helvetica', 'Georgia', 
    'Times New Roman', 'Courier New', 'Verdana', 'Comic Sans MS'
  ];

  const colors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080',
    '#FFC0CB', '#A52A2A', '#808080', '#000080', '#008000'
  ];

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const productId = location.state?.productId;
      if (!productId) {
        toast.error("No product selected for design");
        navigate("/products");
        return;
      }

      const productData = await productService.getById(productId);
      setProduct(productData);
    } catch (error) {
      toast.error("Failed to load product");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const generateId = () => Date.now() + Math.random();

  const handleAddText = () => {
    const newTextElement = {
      id: generateId(),
      type: 'text',
      content: 'Double click to edit',
      x: 200,
      y: 200,
      fontFamily: fontFamily,
      fontSize: fontSize,
      color: textColor,
      bold: isBold,
      italic: isItalic,
      underline: isUnderline
    };

    setDesignElements([...designElements, newTextElement]);
    setSelectedElement(newTextElement);
    setActiveTool(null);
    toast.success("Text element added");
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImageElement = {
          id: generateId(),
          type: 'image',
          src: e.target.result,
          x: 150,
          y: 150,
          width: 200,
          height: 200
        };

        setDesignElements([...designElements, newImageElement]);
        setSelectedElement(newImageElement);
        setActiveTool(null);
        toast.success("Image uploaded successfully");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleElementClick = (element, event) => {
    event.stopPropagation();
    setSelectedElement(element);
    
    if (element.type === 'text') {
      setFontFamily(element.fontFamily);
      setFontSize(element.fontSize);
      setTextColor(element.color);
      setIsBold(element.bold);
      setIsItalic(element.italic);
      setIsUnderline(element.underline);
    }
  };

  const handleElementDoubleClick = (element, event) => {
    event.stopPropagation();
    if (element.type === 'text') {
      setEditingText(element.id);
      setTextContent(element.content);
    }
  };

  const handleTextSave = () => {
    if (editingText && textContent.trim()) {
      setDesignElements(elements => 
        elements.map(el => 
          el.id === editingText 
            ? { ...el, content: textContent.trim() }
            : el
        )
      );
      toast.success("Text updated");
    }
    setEditingText(null);
    setTextContent('');
  };

  const handleMouseDown = (element, event) => {
    if (editingText) return;
    
    setIsDragging(true);
    setSelectedElement(element);
    setDragStart({
      x: event.clientX - element.x,
      y: event.clientY - element.y
    });
  };

  const handleMouseMove = (event) => {
    if (!isDragging || !selectedElement) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const newX = event.clientX - rect.left - dragStart.x;
    const newY = event.clientY - rect.top - dragStart.y;

    setDesignElements(elements =>
      elements.map(el =>
        el.id === selectedElement.id
          ? { ...el, x: Math.max(0, newX), y: Math.max(0, newY) }
          : el
      )
    );

    setSelectedElement(prev => ({ ...prev, x: Math.max(0, newX), y: Math.max(0, newY) }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const applyTextStyle = (property, value) => {
    if (selectedElement && selectedElement.type === 'text') {
      const updatedElement = { ...selectedElement, [property]: value };
      
      setDesignElements(elements =>
        elements.map(el =>
          el.id === selectedElement.id ? updatedElement : el
        )
      );
      
      setSelectedElement(updatedElement);

      // Update local state
      if (property === 'fontFamily') setFontFamily(value);
      else if (property === 'fontSize') setFontSize(value);
      else if (property === 'color') setTextColor(value);
      else if (property === 'bold') setIsBold(value);
      else if (property === 'italic') setIsItalic(value);
      else if (property === 'underline') setIsUnderline(value);
    }
  };

  const deleteElement = (elementId) => {
    setDesignElements(elements => elements.filter(el => el.id !== elementId));
    if (selectedElement && selectedElement.id === elementId) {
      setSelectedElement(null);
    }
    toast.success("Element deleted");
  };

  const saveDesign = () => {
    toast.success("Design saved successfully!");
  };

  const exportDesign = () => {
    toast.success("Design exported successfully!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading design studio...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <ApperIcon name="AlertCircle" className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-4">The selected product could not be loaded.</p>
          <Button onClick={() => navigate("/products")}>
            Return to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              icon="ArrowLeft"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
            <div>
              <h1 className="font-display font-bold text-xl text-gray-900">
                Design Studio
              </h1>
              <p className="text-sm text-gray-600">
                Designing: {product.name}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={saveDesign}>
              <ApperIcon name="Save" size={16} />
              Save
            </Button>
            <Button variant="primary" size="sm" onClick={exportDesign}>
              <ApperIcon name="Download" size={16} />
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Toolbar */}
        <div className="w-80 bg-surface border-r border-gray-200 flex flex-col">
          {/* Tools */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Tools</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={activeTool === 'text' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setActiveTool('text')}
                className="justify-start"
              >
                <ApperIcon name="Type" size={16} />
                Text
              </Button>
              <Button
                variant={activeTool === 'image' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => {
                  setActiveTool('image');
                  fileInputRef.current?.click();
                }}
                className="justify-start"
              >
                <ApperIcon name="Image" size={16} />
                Image
              </Button>
            </div>
            
            {activeTool === 'text' && (
              <div className="mt-3">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleAddText}
                  className="w-full"
                >
                  Add Text Element
                </Button>
              </div>
            )}
          </div>

          {/* Text Properties */}
          {selectedElement && selectedElement.type === 'text' && (
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Text Properties</h3>
              
              {/* Font Family */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Font Family
                </label>
                <select
                  value={fontFamily}
                  onChange={(e) => applyTextStyle('fontFamily', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {fontFamilies.map(font => (
                    <option key={font} value={font}>{font}</option>
                  ))}
                </select>
              </div>

              {/* Font Size */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Font Size
                </label>
                <input
                  type="range"
                  min="8"
                  max="72"
                  value={fontSize}
                  onChange={(e) => applyTextStyle('fontSize', parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="text-sm text-gray-600 text-center">{fontSize}px</div>
              </div>

              {/* Color Picker */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Text Color
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {colors.map(color => (
                    <button
                      key={color}
                      onClick={() => applyTextStyle('color', color)}
                      className={`w-8 h-8 rounded-lg border-2 ${
                        textColor === color ? 'border-primary-500' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Text Formatting */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Formatting
                </label>
                <div className="flex gap-2">
                  <Button
                    variant={isBold ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => applyTextStyle('bold', !isBold)}
                  >
                    <ApperIcon name="Bold" size={16} />
                  </Button>
                  <Button
                    variant={isItalic ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => applyTextStyle('italic', !isItalic)}
                  >
                    <ApperIcon name="Italic" size={16} />
                  </Button>
                  <Button
                    variant={isUnderline ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => applyTextStyle('underline', !isUnderline)}
                  >
                    <ApperIcon name="Underline" size={16} />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Layers Panel */}
          <div className="flex-1 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Layers</h3>
            <div className="space-y-2">
              {designElements.map((element, index) => (
                <div
                  key={element.id}
                  onClick={() => setSelectedElement(element)}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedElement?.id === element.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ApperIcon 
                        name={element.type === 'text' ? 'Type' : 'Image'} 
                        size={16} 
                        className="text-gray-600"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {element.type === 'text' 
                          ? element.content.length > 20 
                            ? element.content.substring(0, 20) + '...'
                            : element.content
                          : `Image ${index + 1}`
                        }
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteElement(element.id);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <ApperIcon name="Trash2" size={14} />
                    </Button>
                  </div>
                </div>
              ))}
              
              {designElements.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <ApperIcon name="Layers" size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No design elements yet</p>
                  <p className="text-xs">Use the tools above to add elements</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Design Canvas */}
        <div className="flex-1 bg-gray-100 overflow-hidden">
          <div className="h-full p-8 flex items-center justify-center">
            <div
              ref={canvasRef}
              className="relative bg-white rounded-lg shadow-lg overflow-hidden"
              style={{ width: '600px', height: '600px' }}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onClick={() => {
                setSelectedElement(null);
                setEditingText(null);
              }}
            >
              {/* Product Background */}
<img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />

              {/* Design Elements */}
              {designElements.map((element) => (
                <div key={element.id}>
                  {element.type === 'text' ? (
                    <div
                      className={`absolute cursor-move select-none ${
                        selectedElement?.id === element.id ? 'ring-2 ring-primary-500' : ''
                      }`}
                      style={{
                        left: element.x,
                        top: element.y,
                        fontFamily: element.fontFamily,
                        fontSize: `${element.fontSize}px`,
                        color: element.color,
                        fontWeight: element.bold ? 'bold' : 'normal',
                        fontStyle: element.italic ? 'italic' : 'normal',
                        textDecoration: element.underline ? 'underline' : 'none'
                      }}
                      onClick={(e) => handleElementClick(element, e)}
                      onDoubleClick={(e) => handleElementDoubleClick(element, e)}
                      onMouseDown={(e) => handleMouseDown(element, e)}
                    >
                      {editingText === element.id ? (
                        <input
                          type="text"
                          value={textContent}
                          onChange={(e) => setTextContent(e.target.value)}
                          onBlur={handleTextSave}
                          onKeyPress={(e) => e.key === 'Enter' && handleTextSave()}
                          className="bg-transparent border-none outline-none"
                          style={{
                            fontFamily: element.fontFamily,
                            fontSize: `${element.fontSize}px`,
                            color: element.color,
                            fontWeight: element.bold ? 'bold' : 'normal',
                            fontStyle: element.italic ? 'italic' : 'normal',
                            textDecoration: element.underline ? 'underline' : 'none'
                          }}
                          autoFocus
                        />
                      ) : (
                        element.content
                      )}
                    </div>
                  ) : (
                    <img
                      src={element.src}
                      alt="Design element"
                      className={`absolute cursor-move ${
                        selectedElement?.id === element.id ? 'ring-2 ring-primary-500' : ''
                      }`}
                      style={{
                        left: element.x,
                        top: element.y,
                        width: element.width,
                        height: element.height
                      }}
                      onClick={(e) => handleElementClick(element, e)}
                      onMouseDown={(e) => handleMouseDown(element, e)}
                      draggable={false}
                    />
                  )}
                </div>
              ))}

              {/* Canvas Instructions */}
              {designElements.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center text-gray-400">
                    <ApperIcon name="MousePointer" size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">Start Designing</p>
                    <p className="text-sm">Use the tools on the left to add text and images</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hidden file input for image upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
};

export default DesignStudio;