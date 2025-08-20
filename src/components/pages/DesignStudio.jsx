import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { orderService } from "@/services/api/orderService";
import { designElementsService } from "@/services/api/designElementsService";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const DesignStudio = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // Image editing state
  const [aspectRatioLocked, setAspectRatioLocked] = useState(true);
  
  // Product and design state
  const [designElements, setDesignElements] = useState([]);
  const [canvasElements, setCanvasElements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('shapes');
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
    loadDesignElements();
  }, [selectedCategory]);

const loadDesignElements = async () => {
    try {
      setLoading(true);
      const elements = await designElementsService.getByCategory(selectedCategory);
      setDesignElements(elements);
    } catch (error) {
      toast.error("Failed to load design elements");
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
setCanvasElements([...canvasElements, newTextElement]);
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
setCanvasElements([...canvasElements, newImageElement]);
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
    
    // Set properties based on element type
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
      // Set the current content, or empty string if it's the placeholder
      setTextContent(element.content === "Double click to edit" ? '' : (element.content || ''));
    }
  };

const handleTextSave = () => {
    if (editingText) {
      // Use the entered text, or placeholder if empty
      const finalContent = textContent.trim() || "Double click to edit";
      
      setCanvasElements(elements => 
        elements.map(el =>
          el.id === editingText 
            ? { ...el, content: finalContent }
            : el
        )
      );
      
      if (textContent.trim()) {
        toast.success("Text updated");
      }
    }
    setEditingText(null);
    setTextContent('');
  };
const handleMouseDown = (element, event) => {
    if (editingText) return;
    event.preventDefault();
    event.stopPropagation();
    
    const rect = canvasRef.current.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - element.x;
    const offsetY = event.clientY - rect.top - element.y;
    
    setIsDragging(true);
    setSelectedElement(element);
    setDragStart({
      x: offsetX,
      y: offsetY
    });

    // Attach mouse events to document for proper drag tracking
    const handleDocumentMouseMove = (e) => {
      if (!canvasRef.current) return;
      
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const newX = e.clientX - canvasRect.left - offsetX;
      const newY = e.clientY - canvasRect.top - offsetY;
      
      // Constrain to canvas bounds using dynamic element dimensions
      const elementWidth = element.width || (element.type === 'text' ? 100 : 200);
      const elementHeight = element.height || (element.type === 'text' ? 30 : 200);
      const constrainedX = Math.max(0, Math.min(newX, 600 - elementWidth));
      const constrainedY = Math.max(0, Math.min(newY, 600 - elementHeight));
setCanvasElements(elements =>
        elements.map(el =>
          el.id === element.id
            ? { ...el, x: constrainedX, y: constrainedY }
            : el
        )
      );

      setSelectedElement(prev => ({ ...prev, x: constrainedX, y: constrainedY }));
    };

    const handleDocumentMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleDocumentMouseMove);
      document.removeEventListener('mouseup', handleDocumentMouseUp);
    };

    document.addEventListener('mousemove', handleDocumentMouseMove);
    document.addEventListener('mouseup', handleDocumentMouseUp);
  };

  const handleMouseMove = (event) => {
    // This function is now handled by document event listeners during drag
    // Keep for compatibility but the actual dragging is handled in handleMouseDown
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const applyTextStyle = (property, value) => {
    if (selectedElement && selectedElement.type === 'text') {
      const updatedElement = { ...selectedElement, [property]: value };
setCanvasElements(elements =>
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

  const applyImageStyle = (property, value) => {
    if (selectedElement && selectedElement.type === 'image') {
      let updatedElement = { ...selectedElement };
      
      if (property === 'width') {
        updatedElement.width = value;
        // Maintain aspect ratio if locked
        if (aspectRatioLocked && selectedElement.height && selectedElement.width) {
          const aspectRatio = selectedElement.width / selectedElement.height;
          updatedElement.height = Math.round(value / aspectRatio);
        }
      } else if (property === 'height') {
        updatedElement.height = value;
        // Maintain aspect ratio if locked
        if (aspectRatioLocked && selectedElement.height && selectedElement.width) {
          const aspectRatio = selectedElement.width / selectedElement.height;
          updatedElement.width = Math.round(value * aspectRatio);
        }
      }
      
      // Ensure image stays within canvas bounds
      if (updatedElement.x + updatedElement.width > 600) {
        updatedElement.x = 600 - updatedElement.width;
      }
      if (updatedElement.y + updatedElement.height > 600) {
        updatedElement.y = 600 - updatedElement.height;
      }
setCanvasElements(elements =>
        elements.map(el =>
          el.id === selectedElement.id ? updatedElement : el
        )
      );
      
      setSelectedElement(updatedElement);
    }
  };

const deleteElement = (elementId) => {
    setCanvasElements(elements => elements.filter(el => el.id !== elementId));
    if (selectedElement && selectedElement.id === elementId) {
      setSelectedElement(null);
    }
    toast.success("Element deleted");
  };

const saveDesign = () => {
    const designData = {
      elements: canvasElements,
      canvasSize: { width: 800, height: 600 },
      name: `Design ${new Date().toLocaleDateString()}`,
      savedAt: new Date().toISOString()
    };
    // In a real app, this would save to a backend
    localStorage.setItem('saved-design', JSON.stringify(designData));
    toast.success("Design saved successfully!");
  };

  const exportDesign = () => {
    // Create a simple export by generating an image preview
    const canvas = canvasRef.current;
    if (canvas) {
      // In a real app, this would generate and download the design
      toast.success("Design exported successfully!");
    }
  };

  const placeOrder = async () => {
    try {
      if (canvasElements.length === 0) {
        toast.error("Please add some elements to your design before placing an order");
        return;
      }

      const orderData = {
        design: {
          elements: canvasElements,
          canvasSize: { width: 800, height: 600 }
        },
        productType: "Custom Design",
        quantity: 1,
        price: 29.99,
        customerNotes: "Custom design created in Design Studio"
      };

      await orderService.create(orderData);
      toast.success("Order placed successfully! Check My Orders for updates.");
      navigate("/my-orders");
    } catch (error) {
      toast.error("Failed to place order");
      console.error(error);
    }
  };

const categories = [
    { id: 'shapes', name: 'Shapes', icon: 'Square' },
    { id: 'text', name: 'Text', icon: 'Type' },
    { id: 'images', name: 'Images', icon: 'Image' },
    { id: 'icons', name: 'Icons', icon: 'Star' }
  ];

  const addElementToCanvas = (element) => {
    const newElement = {
      id: generateId(),
      type: element.type,
      x: Math.random() * 300 + 50,
      y: Math.random() * 200 + 50,
      ...element.defaultProps,
      selected: false
    };
    
    if (element.type === 'text') {
      newElement.content = element.defaultProps.content;
      newElement.fontSize = element.defaultProps.fontSize;
      newElement.fontFamily = element.defaultProps.fontFamily;
      newElement.color = element.defaultProps.color;
      newElement.fontWeight = element.defaultProps.fontWeight;
    } else if (element.type === 'shape') {
      newElement.fill = element.defaultProps.fill;
      newElement.stroke = element.defaultProps.stroke;
      newElement.strokeWidth = element.defaultProps.strokeWidth;
      newElement.width = element.defaultProps.width;
      newElement.height = element.defaultProps.height;
      newElement.shapeType = element.name.toLowerCase();
    } else if (element.type === 'icon') {
      newElement.iconName = element.defaultProps.icon;
      newElement.size = element.defaultProps.size;
      newElement.color = element.defaultProps.color;
    }

    setCanvasElements(prev => [...prev, newElement]);
    toast.success(`${element.name} added to canvas`);
  };

  return (
<div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
<div>
            <h1 className="font-display font-bold text-xl text-gray-900">
              Design Studio
            </h1>
            <p className="text-sm text-gray-600">
              Create your custom design
</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={saveDesign}>
              <ApperIcon name="Save" size={16} />
              Save
            </Button>
            <Button variant="outline" size="sm" onClick={exportDesign}>
              <ApperIcon name="Download" size={16} />
              Export
            </Button>
            <Button variant="primary" size="sm" onClick={placeOrder}>
              <ApperIcon name="ShoppingCart" size={16} />
              Place Order
            </Button>
          </div>
        </div>
      </div>

<div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar - Combined Tools and Elements */}
        <div className="w-80 bg-surface border-r border-gray-200 flex flex-col">
          {/* Tools Section */}
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

          {/* Image Properties */}
          {selectedElement && selectedElement.type === 'image' && (
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Image Properties</h3>
              
              {/* Aspect Ratio Lock */}
              <div className="mb-3">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <input
                    type="checkbox"
                    checked={aspectRatioLocked}
                    onChange={(e) => setAspectRatioLocked(e.target.checked)}
                    className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                  />
                  Lock Aspect Ratio
                </label>
              </div>

              {/* Width */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Width
                </label>
                <input
                  type="range"
                  min="50"
                  max="500"
                  value={selectedElement.width || 200}
                  onChange={(e) => applyImageStyle('width', parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="text-sm text-gray-600 text-center">{selectedElement.width || 200}px</div>
              </div>

              {/* Height */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Height
                </label>
                <input
                  type="range"
                  min="50"
                  max="500"
                  value={selectedElement.height || 200}
                  onChange={(e) => applyImageStyle('height', parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="text-sm text-gray-600 text-center">{selectedElement.height || 200}px</div>
              </div>

              {/* Reset Size Button */}
              <div className="mb-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    applyImageStyle('width', 200);
                    applyImageStyle('height', 200);
                  }}
                  className="w-full"
                >
                  <ApperIcon name="RotateCcw" size={16} />
                  Reset Size
                </Button>
              </div>
            </div>
          )}

          {/* Design Elements Section */}
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-display font-semibold text-lg text-gray-900 mb-4">
              Design Elements
            </h2>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? "bg-primary-100 text-primary-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <ApperIcon name={category.icon} size={16} />
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Elements List */}
          <div className="flex-1 overflow-y-auto p-4">
            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="space-y-2 mb-4">
                {designElements.map((element) => (
                  <div
                    key={element.Id}
                    className="p-3 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors cursor-pointer"
                    onClick={() => addElementToCanvas(element)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center">
                        <ApperIcon name={element.icon} size={20} className="text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{element.name}</h3>
                        <p className="text-sm text-gray-500">{element.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Layers Panel */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold text-gray-900 mb-3">Layers</h3>
              <div className="space-y-2">
                {canvasElements.map((element, index) => (
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
                
                {canvasElements.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <ApperIcon name="Layers" size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No design elements yet</p>
                    <p className="text-xs">Use the tools above to add elements</p>
                  </div>
                )}
              </div>
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
<div className="absolute inset-0 bg-white rounded-lg">
                {/* Canvas Grid Background */}
<div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='grid' width='20' height='20' patternUnits='userSpaceOnUse'%3e%3cpath d='M 20 0 L 0 0 0 20' fill='none' stroke='%23e5e7eb' stroke-width='1'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23grid)' /%3e%3c/svg%3e")`,
                    backgroundSize: '20px 20px'
                  }}
                />
              </div>

{/* Design Elements */}
              {canvasElements.map((element) => (
                <div key={element.id}>
                  {element.type === 'text' ? (
                    <div
                      className={`absolute cursor-move select-none ${
                        selectedElement?.id === element.id ? 'ring-2 ring-primary-500' : ''
                      }`}
style={{
                        position: 'absolute',
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
                          onBlur={(e) => {
                            // Small delay to ensure any click events are processed first
                            setTimeout(() => {
                              if (editingText === element.id) {
                                handleTextSave();
                              }
                            }, 100);
                          }}
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
                        position: 'absolute',
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
              {canvasElements.length === 0 && (
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