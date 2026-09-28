import React, { useState, useEffect } from 'react';
import { sound } from '../utils/audioSynth';
import { Cpu, Binary, Zap, RefreshCw, Terminal, GitBranch, Play, CheckCircle2, Layers } from 'lucide-react';

export default function CSAnimationsSection() {
  const [activeTab, setActiveTab] = useState('sorting'); // 'sorting', 'neural', 'cpu', 'logic'

  // --- 1. Sorting Algorithm State ---
  const [sortArray, setSortArray] = useState([45, 12, 89, 34, 67, 23, 90, 11, 56, 78, 30, 95]);
  const [isSorting, setIsSorting] = useState(false);
  const [activeSortIndices, setActiveSortIndices] = useState([]);
  const [swapCount, setSwapCount] = useState(0);

  const resetSortArray = () => {
    sound.playClick();
    const newArr = Array.from({ length: 12 }, () => Math.floor(Math.random() * 85) + 15);
    setSortArray(newArr);
    setSwapCount(0);
    setActiveSortIndices([]);
  };

  const runBubbleSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    sound.playClick();

    let arr = [...sortArray];
    let swaps = 0;

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        setActiveSortIndices([j, j + 1]);
        sound.playHover();
        if (arr[j] > arr[j + 1]) {
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          swaps++;
          setSwapCount(swaps);
          setSortArray([...arr]);
        }
        await new Promise((r) => setTimeout(r, 120));
      }
    }

    setActiveSortIndices([]);
    setIsSorting(false);
    sound.playAchievement();
  };

  // --- 2. Logic Gate State ---
  const [gateA, setGateA] = useState(1);
  const [gateB, setGateB] = useState(0);
  const [gateType, setGateType] = useState('AND');

  const getGateOutput = () => {
    if (gateType === 'AND') return gateA && gateB ? 1 : 0;
    if (gateType === 'OR') return gateA || gateB ? 1 : 0;
    if (gateType === 'XOR') return gateA !== gateB ? 1 : 0;
    return 0;
  };

  // --- 3. CPU Register Execution State ---
  const [registers, setRegisters] = useState({ EAX: '0x0042', EBX: '0x00FF', ECX: '0x0010', EDX: '0x0000' });
  const [assemblyLine, setAssemblyLine] = useState(0);
  const assemblyCode = [
    'MOV EAX, 0x0042  ; Load 66 into accumulator',
    'MOV EBX, 0x00FF  ; Load 255 into base reg',
    'ADD EAX, EBX     ; EAX = 66 + 255 (321)',
    'MOV ECX, EAX     ; Store result in counter reg',
    'XOR EDX, EDX     ; Clear data register'
  ];

  const stepAssembly = () => {
    sound.playClick();
    const nextLine = (assemblyLine + 1) % assemblyCode.length;
    setAssemblyLine(nextLine);

    if (nextLine === 0) setRegisters({ EAX: '0x0042', EBX: '0x00FF', ECX: '0x0010', EDX: '0x0000' });
    if (nextLine === 1) setRegisters({ EAX: '0x0042', EBX: '0x00FF', ECX: '0x0010', EDX: '0x0000' });
    if (nextLine === 2) setRegisters({ EAX: '0x0141', EBX: '0x00FF', ECX: '0x0010', EDX: '0x0000' });
    if (nextLine === 3) setRegisters({ EAX: '0x0141', EBX: '0x00FF', ECX: '0x0141', EDX: '0x0000' });
    if (nextLine === 4) setRegisters({ EAX: '0x0141', EBX: '0x00FF', ECX: '0x0141', EDX: '0x0000' });
  };

  return (
    <section id="cs-lab" className="py-24 relative z-10 px-4 bg-white/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-mono text-blue-600 font-semibold">
            <Cpu className="w-3.5 h-3.5 text-blue-600" />
            <span>INTERACTIVE COMPUTER SCIENCE LAB</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-space text-[#101828] tracking-tight">
            ALGORITHM & <span className="text-gradient-primary">CS VISUALIZERS</span>
          </h2>
          <p className="text-gray-600 text-sm max-w-xl mx-auto font-inter">
            Explore interactive core computer science simulations: Sorting algorithms, logic gates, and CPU execution units.
          </p>
        </div>

        {/* Tab Selectors */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('sorting');
            }}
            onMouseEnter={() => sound.playHover()}
            className={`px-5 py-2.5 rounded-2xl font-mono text-xs transition-all flex items-center gap-2 ${
              activeTab === 'sorting'
                ? 'bg-blue-600 text-white font-bold shadow-md scale-105'
                : 'apple-glass-card text-gray-700 hover:bg-white'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>1. Sorting Algorithm Simulator</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('logic');
            }}
            onMouseEnter={() => sound.playHover()}
            className={`px-5 py-2.5 rounded-2xl font-mono text-xs transition-all flex items-center gap-2 ${
              activeTab === 'logic'
                ? 'bg-purple-600 text-white font-bold shadow-md scale-105'
                : 'apple-glass-card text-gray-700 hover:bg-white'
            }`}
          >
            <Binary className="w-4 h-4" />
            <span>2. Binary Logic Circuit Simulator</span>
          </button>

          <button
            onClick={() => {
              sound.playClick();
              setActiveTab('cpu');
            }}
            onMouseEnter={() => sound.playHover()}
            className={`px-5 py-2.5 rounded-2xl font-mono text-xs transition-all flex items-center gap-2 ${
              activeTab === 'cpu'
                ? 'bg-cyan-600 text-white font-bold shadow-md scale-105'
                : 'apple-glass-card text-gray-700 hover:bg-white'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>3. CPU Register & Assembly Unit</span>
          </button>
        </div>

        {/* Visualizer Display Box */}
        <div className="apple-glass-panel p-8 rounded-3xl border border-gray-200/80 min-h-[420px] shadow-[0_30px_80px_rgba(120,130,180,0.12)] bg-white relative overflow-hidden">
          
          {/* Visualizer 1: Sorting Algorithm */}
          {activeTab === 'sorting' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between pb-4 border-b border-gray-200 gap-4">
                <div>
                  <h3 className="text-xl font-space font-bold text-gray-900">Bubble Sort Visualizer</h3>
                  <p className="text-xs font-mono text-blue-600">Time Complexity: O(N²) • Swaps: {swapCount}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={resetSortArray}
                    disabled={isSorting}
                    className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-mono font-bold flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Shuffle Array</span>
                  </button>

                  <button
                    onClick={runBubbleSort}
                    disabled={isSorting}
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono font-bold shadow-md flex items-center gap-1.5"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>{isSorting ? 'SORTING...' : 'RUN SORT'}</span>
                  </button>
                </div>
              </div>

              {/* Sorting Bar Graph */}
              <div className="h-64 flex items-end justify-center gap-3 p-6 bg-gray-50 rounded-2xl border border-gray-200">
                {sortArray.map((val, idx) => {
                  const isComparing = activeSortIndices.includes(idx);
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                      <span className="text-[10px] font-mono text-gray-500 font-bold">{val}</span>
                      <div
                        className={`w-full rounded-t-xl transition-all duration-150 ${
                          isComparing
                            ? 'bg-gradient-to-t from-purple-600 to-cyan-500 shadow-md scale-105'
                            : 'bg-gradient-to-t from-blue-600 to-blue-400'
                        }`}
                        style={{ height: `${val * 2.2}px` }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Visualizer 2: Binary Logic Circuit Simulator */}
          {activeTab === 'logic' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between pb-4 border-b border-gray-200 gap-4">
                <div>
                  <h3 className="text-xl font-space font-bold text-gray-900">Binary Logic Gate Simulator</h3>
                  <p className="text-xs font-mono text-purple-600">Gate Mode: {gateType} Gate • Boolean Output</p>
                </div>

                <div className="flex items-center gap-2">
                  {['AND', 'OR', 'XOR'].map((g) => (
                    <button
                      key={g}
                      onClick={() => {
                        sound.playClick();
                        setGateType(g);
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                        gateType === g ? 'bg-purple-600 text-white shadow-sm' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Gate Visual Diagram */}
              <div className="p-8 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col md:flex-row items-center justify-around gap-8">
                
                {/* Inputs */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-gray-700">INPUT A:</span>
                    <button
                      onClick={() => {
                        sound.playClick();
                        setGateA(gateA ? 0 : 1);
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shadow-sm ${
                        gateA ? 'bg-emerald-600 text-white' : 'bg-rose-500 text-white'
                      }`}
                    >
                      SIGNAL {gateA} ({gateA ? 'HIGH +5V' : 'LOW 0V'})
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-gray-700">INPUT B:</span>
                    <button
                      onClick={() => {
                        sound.playClick();
                        setGateB(gateB ? 0 : 1);
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shadow-sm ${
                        gateB ? 'bg-emerald-600 text-white' : 'bg-rose-500 text-white'
                      }`}
                    >
                      SIGNAL {gateB} ({gateB ? 'HIGH +5V' : 'LOW 0V'})
                    </button>
                  </div>
                </div>

                {/* Gate Symbol */}
                <div className="p-6 rounded-3xl bg-white border border-gray-300 shadow-md text-center">
                  <div className="font-space font-extrabold text-2xl text-purple-700 mb-1">
                    {gateType} GATE
                  </div>
                  <span className="text-[10px] font-mono text-gray-500">DIGITAL LOGIC CHIP</span>
                </div>

                {/* Output */}
                <div className="text-center space-y-2">
                  <span className="font-mono text-xs font-bold text-gray-700 block">OUTPUT Y:</span>
                  <div
                    className={`px-6 py-3 rounded-2xl text-sm font-mono font-extrabold transition-all shadow-md ${
                      getGateOutput() ? 'bg-emerald-600 text-white shadow-emerald-200' : 'bg-gray-300 text-gray-700'
                    }`}
                  >
                    SIGNAL {getGateOutput()} ({getGateOutput() ? 'HIGH +5V' : 'LOW 0V'})
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Visualizer 3: CPU Register Unit */}
          {activeTab === 'cpu' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between pb-4 border-b border-gray-200 gap-4">
                <div>
                  <h3 className="text-xl font-space font-bold text-gray-900">CPU Assembly Register Unit</h3>
                  <p className="text-xs font-mono text-cyan-600">x86 Architecture Execution Stream</p>
                </div>

                <button
                  onClick={stepAssembly}
                  className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-mono font-bold shadow-md flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>STEP INSTRUCTION</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Code Window */}
                <div className="md:col-span-7 bg-gray-900 rounded-2xl p-5 font-mono text-xs text-gray-200 space-y-2 shadow-inner">
                  <span className="text-gray-500 text-[10px] block mb-2">// ASSEMBLY INSTRUCTION STREAM</span>
                  {assemblyCode.map((code, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded-lg flex items-center gap-2 transition-all ${
                        assemblyLine === idx ? 'bg-blue-600 text-white font-bold' : 'hover:bg-gray-800'
                      }`}
                    >
                      <span className="text-cyan-400 font-bold">0{idx + 1}.</span>
                      <span>{code}</span>
                    </div>
                  ))}
                </div>

                {/* Registers Window */}
                <div className="md:col-span-5 space-y-3">
                  <span className="text-xs font-mono text-gray-500 uppercase block font-bold">REGISTER STATE:</span>
                  {Object.entries(registers).map(([reg, val]) => (
                    <div key={reg} className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex justify-between items-center font-mono text-xs">
                      <span className="font-bold text-blue-600">{reg}:</span>
                      <span className="bg-white px-3 py-1 rounded-lg border border-gray-200 font-bold text-gray-800 shadow-xs">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
