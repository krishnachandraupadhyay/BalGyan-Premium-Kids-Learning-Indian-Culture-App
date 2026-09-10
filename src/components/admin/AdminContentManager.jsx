import React, { useState } from 'react';
import { ArrowLeft, Plus, Trash2, Download, Upload, Check, Sparkles } from 'lucide-react';
import { soundService } from '../../services/audioService';

export default function AdminContentManager({ profile, onAddCustomWord, onRemoveCustomWord, onBack }) {
  const [activeType, setActiveType] = useState('english'); // 'english' | 'hindi' | 'math'
  const [newLetter, setNewLetter] = useState('A');
  const [newWord, setNewWord] = useState('');
  const [newHindi, setNewHindi] = useState('');
  const [newEmoji, setNewEmoji] = useState('🌟');
  const [newMeaning, setNewMeaning] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleAddWord = (e) => {
    e.preventDefault();
    if (!newWord || !newHindi) return;

    onAddCustomWord({
      type: activeType,
      letter: newLetter,
      word: newWord,
      hindi: newHindi,
      emoji: newEmoji || '🌟',
      hindiMeaning: newMeaning || `${newWord} means ${newHindi}`
    });

    soundService.playCorrect();
    setSuccessMsg(`Added "${newWord}" successfully!`);
    setNewWord('');
    setNewHindi('');
    setNewMeaning('');
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  const handleExportJSON = () => {
    soundService.playClick();
    const dataStr = JSON.stringify(profile.customWords || [], null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'balgyan_custom_content.json';
    link.click();
  };

  return (
    <div className="learning-arena">
      {/* Top Header */}
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
          <ArrowLeft size={20} /> Back to Dashboard
        </button>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="kid-btn"
            onClick={handleExportJSON}
            style={{ background: '#10AC84', color: '#FFFFFF', boxShadow: '0 4px 0 #059669', fontSize: '14px' }}
          >
            <Download size={16} /> Export Content (JSON)
          </button>
        </div>
      </div>

      {/* Main Admin Editor Card */}
      <div className="arena-card" style={{ borderTop: '10px solid #8B5CF6', textAlign: 'left' }}>
        <h3 style={{ fontSize: '26px', fontWeight: 800, color: '#1E293B', marginBottom: '6px' }}>
          Content Management System (CMS) 📝
        </h3>
        <p style={{ color: '#64748B', fontSize: '15px', marginBottom: '24px' }}>
          Add new learning words, vocabulary, and questions dynamically without modifying source code.
        </p>

        {/* Add New Word Form */}
        <form onSubmit={handleAddWord} style={{ background: '#F8FAFC', padding: '24px', borderRadius: '24px', border: '2px solid #E2E8F0', marginBottom: '28px' }}>
          <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#4338CA', marginBottom: '16px' }}>
            ➕ Add New Learning Item
          </h4>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '14px',
            marginBottom: '16px'
          }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, marginBottom: '6px', color: '#334155' }}>
                Letter / Category
              </label>
              <input
                type="text"
                value={newLetter}
                onChange={(e) => setNewLetter(e.target.value.toUpperCase())}
                maxLength={4}
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '2px solid #CBD5E1', fontSize: '16px', fontWeight: 700 }}
                placeholder="e.g. A, R, क"
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, marginBottom: '6px', color: '#334155' }}>
                Word (English / Sanskrit)
              </label>
              <input
                type="text"
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '2px solid #CBD5E1', fontSize: '16px' }}
                placeholder="e.g. Astronaut"
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, marginBottom: '6px', color: '#334155' }}>
                Hindi Translation
              </label>
              <input
                type="text"
                value={newHindi}
                onChange={(e) => setNewHindi(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '2px solid #CBD5E1', fontSize: '16px' }}
                placeholder="e.g. अंतरिक्ष यात्री"
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, marginBottom: '6px', color: '#334155' }}>
                Emoji / Visual Symbol
              </label>
              <input
                type="text"
                value={newEmoji}
                onChange={(e) => setNewEmoji(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '2px solid #CBD5E1', fontSize: '18px' }}
                placeholder="e.g. 👨‍🚀, 🍎"
              />
            </div>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: 700, marginBottom: '6px', color: '#334155' }}>
              Full Phonetic Narration Sentence
            </label>
            <input
              type="text"
              value={newMeaning}
              onChange={(e) => setNewMeaning(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '2px solid #CBD5E1', fontSize: '16px' }}
              placeholder="e.g. A for Astronaut. Astronaut means अंतरिक्ष यात्री."
            />
          </div>

          {successMsg && (
            <div style={{ color: '#16A34A', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Check size={18} /> {successMsg}
            </div>
          )}

          <button type="submit" className="kid-btn kid-btn-green" style={{ fontSize: '16px' }}>
            <Plus size={18} /> Add Word to App
          </button>
        </form>

        {/* List of Custom Added Words */}
        <div>
          <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#1E293B', marginBottom: '14px' }}>
            Custom Words Added ({profile.customWords?.length || 0})
          </h4>

          {(!profile.customWords || profile.customWords.length === 0) ? (
            <p style={{ color: '#94A3B8', fontStyle: 'italic' }}>
              No custom words added yet. All built-in 130+ standard vocabulary words are loaded!
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {profile.customWords.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 18px',
                    background: '#FFFFFF',
                    border: '2px solid #E2E8F0',
                    borderRadius: '16px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '28px' }}>{item.emoji}</span>
                    <div>
                      <div style={{ fontSize: '17px', fontWeight: 800, color: '#1E293B' }}>
                        {item.letter} - {item.word} ({item.hindi})
                      </div>
                      <div style={{ fontSize: '13px', color: '#64748B' }}>{item.hindiMeaning}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => { soundService.playClick(); onRemoveCustomWord(item.id); }}
                    style={{ background: '#FEE2E2', border: 'none', color: '#DC2626', padding: '8px 12px', borderRadius: '10px', cursor: 'pointer' }}
                    title="Delete Word"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
