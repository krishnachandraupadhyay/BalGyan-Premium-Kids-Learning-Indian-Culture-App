import React from 'react';
import { ArrowLeft, Clock, Award, TrendingUp, AlertCircle, Sparkles, Settings, Edit3, Shield } from 'lucide-react';
import { soundService } from '../../services/audioService';
import { speechService } from '../../services/speechService';

export default function ParentDashboard({ profile, onUpdateProfile, onOpenAdmin, onBack, onOpenAgeSelect }) {
  const subjects = [
    { key: 'english', label: 'English Learning (अंग्रेजी)', color: '#FF6B6B' },
    { key: 'hindi', label: 'Hindi Garden (हिंदी वाटिका)', color: '#FFA502' },
    { key: 'numbers', label: 'Number World (संख्या ज्ञान)', color: '#2ED573' },
    { key: 'math', label: 'Math Lab (गणित)', color: '#1E90FF' },
    { key: 'tables', label: 'Table Mountain (पहाड़े)', color: '#9C88FF' },
    { key: 'sanskrit', label: 'Sanskrit Gurukul (संस्कृत)', color: '#FF7675' },
    { key: 'culture', label: 'Bharat Explorer (संस्कृति)', color: '#FF4757' },
    { key: 'habits', label: 'Good Habits (अच्छी आदतें)', color: '#10AC84' }
  ];

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
          <ArrowLeft size={20} /> Back to Learning
        </button>

        <button
          className="kid-btn"
          onClick={() => { soundService.playClick(); onOpenAdmin(); }}
          style={{
            background: '#8B5CF6',
            color: '#FFFFFF',
            boxShadow: '0 4px 0 #7C3AED',
            fontSize: '15px'
          }}
        >
          <Edit3 size={18} /> Admin Content CMS (सामग्री संपादक)
        </button>
      </div>

      {/* Parent Overview Banner */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '32px',
        padding: '28px',
        boxShadow: '0 12px 30px rgba(0,0,0,0.06)',
        border: '3px solid #E2E8F0',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#636E72', fontSize: '14px', fontWeight: 700 }}>
              <Shield size={16} /> PARENT & TEACHER INSIGHTS
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#1E293B', margin: '4px 0' }}>
              {profile.name} (Age {profile.age || 4})
            </h2>
            <p style={{ color: '#64748B', fontSize: '15px', margin: 0 }}>
              Personalized Learning Path & Activity Analytics
            </p>
          </div>

          <button
            className="kid-btn kid-btn-yellow"
            onClick={() => { soundService.playClick(); onOpenAgeSelect(); }}
            style={{ fontSize: '15px', padding: '10px 20px' }}
          >
            Change Age Level (Age {profile.age})
          </button>
        </div>

        {/* Stats Metrics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px'
        }}>
          <div style={{ background: '#EFF6FF', borderRadius: '20px', padding: '16px', border: '2px solid #BFDBFE' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1D4ED8', fontSize: '14px', fontWeight: 700 }}>
              <Clock size={18} /> Total Learning Time
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#1E40AF', marginTop: '6px' }}>
              {profile.learningMinutes || 25} Mins
            </div>
          </div>

          <div style={{ background: '#ECFDF5', borderRadius: '20px', padding: '16px', border: '2px solid #A7F3D0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#047857', fontSize: '14px', fontWeight: 700 }}>
              <TrendingUp size={18} /> Overall Accuracy
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#065F46', marginTop: '6px' }}>
              91%
            </div>
          </div>

          <div style={{ background: '#FFFBEB', borderRadius: '20px', padding: '16px', border: '2px solid #FDE68A' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#B45309', fontSize: '14px', fontWeight: 700 }}>
              <Award size={18} /> Total Stars Earned
            </div>
            <div style={{ fontSize: '28px', fontWeight: 800, color: '#92400E', marginTop: '6px' }}>
              ⭐ {profile.stars || 0}
            </div>
          </div>
        </div>
      </div>

      {/* Adaptive Learning Recommendation */}
      <div style={{
        background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
        borderRadius: '24px',
        padding: '20px 24px',
        border: '3px solid #86EFAC',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
      }}>
        <div style={{ fontSize: '42px' }}>💡</div>
        <div>
          <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#166534', margin: 0 }}>
            Adaptive Recommendation: Practice English Letter 'R' & Sanskrit Words!
          </h4>
          <p style={{ fontSize: '14px', color: '#15803D', margin: '4px 0 0' }}>
            Based on recent quiz accuracy, practicing letter R words (Rose, Rabbit, Rocket) will help solidify letter recognition.
          </p>
        </div>
      </div>

      {/* Subject Progress Bars */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '32px',
        padding: '28px',
        boxShadow: '0 12px 30px rgba(0,0,0,0.06)',
        border: '3px solid #E2E8F0',
        marginBottom: '24px'
      }}>
        <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#1E293B', marginBottom: '18px' }}>
          Subject Mastery & Progress
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {subjects.map((sub) => {
            const data = profile.subjectProgress?.[sub.key] || { completed: 5, total: 20, accuracy: 90 };
            const pct = Math.min(100, Math.round((data.completed / (data.total || 20)) * 100));

            return (
              <div key={sub.key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>
                  <span style={{ color: '#1E293B' }}>{sub.label}</span>
                  <span style={{ color: sub.color, fontWeight: 800 }}>{pct}% Complete ({data.accuracy || 90}% Accuracy)</span>
                </div>
                <div style={{ height: '14px', background: '#F1F5F9', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: sub.color, borderRadius: '999px' }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
