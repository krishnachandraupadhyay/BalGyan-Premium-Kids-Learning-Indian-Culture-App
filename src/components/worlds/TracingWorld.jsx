import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, Sparkles, Check, Eraser, Palette } from 'lucide-react';
import { soundService } from '../../services/audioService';
import { speechService } from '../../services/speechService';

export default function TracingWorld({ onReward, onBack }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [traceType, setTraceType] = useState('capital'); // 'capital' | 'small' | 'hindi' | 'numbers'
  const [charIndex, setCharIndex] = useState(0);
  const [brushColor, setBrushColor] = useState('#FF6B6B');
  const [strokeCount, setStrokeCount] = useState(0);

  const lists = {
    capital: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    small: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    hindi: ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'क', 'ख', 'ग', 'घ', 'च', 'छ', 'ज', 'झ', 'ट', 'ठ', 'त', 'थ', 'द', 'ध', 'न', 'प', 'फ', 'ब', 'भ', 'म'],
    numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
  };

  const currentChar = lists[traceType][charIndex] || lists[traceType][0];

  useEffect(() => {
    clearCanvas();
  }, [currentChar, traceType]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setStrokeCount(0);
  };

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if (e.touches && e.touches.length > 0) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { x, y } = getCoordinates(e);

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      const nextStroke = strokeCount + 1;
      setStrokeCount(nextStroke);

      if (nextStroke === 3) {
        soundService.playCorrect();
        speechService.speak(`Great tracing of ${currentChar}!`);
        onReward(1, 2, 'सुंदर लिखावट! ⭐');
      }
    }
  };

  const colors = ['#FF6B6B', '#4D96FF', '#2ED573', '#FFA502', '#9B51E0', '#FF4757'];

  return (
    <div className="learning-arena">
      {/* Top Bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        marginBottom: '20px'
      }}>
        <button
          className="kid-btn"
          onClick={() => { soundService.playClick(); onBack(); }}
          style={{ background: '#FFFFFF', color: '#2D3436', boxShadow: '0 4px 0 #CBD5E1' }}
        >
          <ArrowLeft size={20} /> Back
        </button>

        {/* Tracing Type Selector */}
        <div style={{
          display: 'flex',
          background: '#FFFFFF',
          padding: '4px',
          borderRadius: '999px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
          border: '2px solid #E2E8F0',
          flexWrap: 'wrap'
        }}>
          {['capital', 'small', 'hindi', 'numbers'].map((t) => (
            <button
              key={t}
              className="kid-btn"
              onClick={() => {
                soundService.playClick();
                setTraceType(t);
                setCharIndex(0);
              }}
              style={{
                padding: '8px 14px',
                fontSize: '14px',
                background: traceType === t ? '#6C5CE7' : 'transparent',
                color: traceType === t ? '#FFFFFF' : '#475569',
                boxShadow: traceType === t ? '0 4px 0 #4834D4' : 'none',
                textTransform: 'capitalize'
              }}
            >
              {t === 'capital' ? 'A-Z' : t === 'small' ? 'a-z' : t === 'hindi' ? 'अ-क' : '1-10'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Tracing Arena */}
      <div className="arena-card" style={{ borderTop: '10px solid #6C5CE7', textAlign: 'center' }}>
        <h3 style={{ fontSize: '26px', fontWeight: 800, color: '#2D3436', marginBottom: '4px' }}>
          Tracing Canvas: Trace "{currentChar}" ✍️
        </h3>
        <p style={{ color: '#636E72', fontSize: '15px', marginBottom: '16px' }}>
          Follow the dotted lines with your finger or mouse! (बिंदुओं पर उंगली घुमाएं)
        </p>

        {/* Brush Color Picker */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '16px' }}>
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setBrushColor(c)}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: c,
                border: brushColor === c ? '3px solid #2D3436' : '2px solid #FFFFFF',
                transform: brushColor === c ? 'scale(1.2)' : 'scale(1)',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                transition: 'all 0.15s ease'
              }}
            />
          ))}
        </div>

        {/* Tracing Canvas Container with Dotted Background Letter */}
        <div
          className="tracing-canvas-box"
          style={{ width: '320px', height: '320px', margin: '0 auto 20px', position: 'relative' }}
        >
          {/* Backdrop Dotted Guide Character */}
          <div style={{
            position: 'absolute',
            fontSize: '200px',
            fontFamily: traceType === 'hindi' ? 'Baloo 2' : 'Fredoka',
            fontWeight: 900,
            color: '#E2E8F0',
            userSelect: 'none',
            pointerEvents: 'none',
            lineHeight: 1
          }}>
            {currentChar}
          </div>

          {/* Foreground Drawing HTML5 Canvas */}
          <canvas
            ref={canvasRef}
            width={320}
            height={320}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            style={{
              position: 'relative',
              zIndex: 2,
              borderRadius: '24px',
              cursor: 'crosshair',
              touchAction: 'none'
            }}
          />
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <button
            className="kid-btn"
            onClick={clearCanvas}
            style={{ background: '#F1F5F9', color: '#475569', boxShadow: '0 4px 0 #CBD5E1' }}
          >
            <Eraser size={20} /> Clear (मिटाएं)
          </button>

          <button
            className="kid-btn kid-btn-green"
            onClick={() => {
              soundService.playCorrect();
              speechService.speak(`Excellent tracing of ${currentChar}!`);
              onReward(1, 2, 'Great Job! ⭐');
            }}
            style={{ fontSize: '18px' }}
          >
            <Check size={22} /> Done (हो गया)
          </button>

          <button
            className="kid-btn kid-btn-primary"
            onClick={() => {
              soundService.playClick();
              setCharIndex((prev) => (prev + 1) % lists[traceType].length);
            }}
            style={{ fontSize: '18px' }}
          >
            <span>Next Character ➔</span>
          </button>
        </div>
      </div>
    </div>
  );
}
