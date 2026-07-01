import { useState } from 'react';
import { 
  Home, Map as MapIcon, Gift, User, Leaf, MapPin, 
  Store, Clock, CreditCard, BookOpen, ArrowRightLeft,
  X, ExternalLink, Ticket, CheckCircle2, QrCode, ChevronLeft
} from 'lucide-react';

// --- Mock Data (靜態模擬資料) ---
const MOCK_USER = {
  name: '一級方程式',
  memberCode: 'ATCC-20260612',
};

const MOCK_ARTICLES = [
  { 
    id: 1, 
    title: '循環標誌正式亮相 7月開放申請 「綠色蝸牛」外型象徵一步步爬向永續未來', 
    date: '2026-06-15', 
    readTime: '4 min', 
    image: 'bg-green-100',
    link: 'https://e-info.org.tw/node/243546' 
  },
  { 
    id: 2, 
    title: '循環袋、循環箱真的環保？一篇看懂配客嘉綠色物流：PLUS循環圈', 
    date: '2024-04-25', 
    readTime: '6 min', 
    image: 'bg-emerald-100',
    link: 'https://package-plus.com/2024/04/package-circular-system/' 
  },
  { 
    id: 3, 
    title: '為什麼要減塑？瞭解2大減塑好處與企業作為，阻止塑膠污染空氣和食物', 
    date: '2023-08-16', 
    readTime: '8 min', 
    image: 'bg-teal-100',
    link: 'https://package-plus.com/2023/08/2-reasons-to-reduce-plastic-waste/' 
  },
];

const MOCK_LOCATIONS = [
  { id: 1, name: '全家 永平店', address: '新北市永和區永平路1號', type: '合作便利商店', status: '可租借 / 可歸還', distance: '120m', x: 40, y: 35 },
  { id: 2, name: '衣級洗衣坊', address: '新北市永和區中山路一段50號', type: '合作洗衣店', status: '可租借 / 可歸還', distance: '250m', x: 75, y: 25 },
  { id: 3, name: '全家 頂溪店', address: '新北市永和區永和路二段2號', type: '合作便利商店', status: '僅限歸還', distance: '350m', x: 60, y: 55 },
  { id: 4, name: '7-11 頂溪門市', address: '新北市永和區文化路10號', type: '合作便利商店', status: '僅限歸還', distance: '400m', x: 30, y: 65 },
];

const MOCK_REWARDS = [
  { id: 1, title: '50元 環保商品折價券', type: 'coupon', points: 10, validUntil: '2026-12-31' },
  { id: 2, title: '免費升級星衣客大杯飲品', type: 'coupon', points: 20, validUntil: '2026-08-31' },
  { id: 3, title: '環保洗手乳禮盒', type: 'gift', points: 200, stock: 12 },
  { id: 4, title: '50元 洗衣折扣券', type: 'gift', points: 50, stock: 5 },
];

const MOCK_HISTORY = {
  rentals: [
    { id: 'R1001', date: '2026-06-05 14:30', store: '全家 永平店', item: '配客嘉循環袋' },
    { id: 'R1002', date: '2026-05-20 12:15', store: '全家 頂溪店', item: '配客嘉循環箱' },
  ],
  returns: [
    { id: 'T1001', date: '2026-06-06 09:00', store: '7-11 頂溪門市', item: 'A型循環餐盒', earnedPoints: 10 },
    { id: 'T1002', date: '2026-05-22 18:40', store: '無包裝商店 永和店', item: 'B型循環購物袋', earnedPoints: 15 },
  ]
};

// --- 共用型別定義 ---
interface ViewProps {
  setActiveTab: (tab: string) => void;
  points: number;
  setPoints: (p: number) => void;
  redeemedItems: any[];
  setRedeemedItems: (items: any[]) => void;
  showModal: (config: ModalConfig) => void;
}

interface ModalConfig {
  title: string;
  content: string;
  type?: 'alert' | 'confirm';
  confirmText?: string;
  onConfirm?: () => void;
}

// --- 各頁面 Components ---

const HomeView = ({ setActiveTab, points, showModal }: ViewProps) => (
  <div className="pb-24 animate-in fade-in duration-300">
    <div className="bg-emerald-600 text-white p-6 rounded-b-3xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">早安，{MOCK_USER.name}</h1>
          <p className="text-emerald-100 text-sm mt-1">今天也是愛地球的一天 🌍</p>
        </div>
        <div className="bg-white/20 p-3 rounded-full">
          <Leaf size={28} className="text-white" />
        </div>
      </div>
      <div className="bg-white text-emerald-900 p-4 rounded-2xl shadow-lg flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500 font-medium mb-1">我的配客點</p>
          <p className="text-2xl font-bold text-emerald-600">{points} <span className="text-sm text-gray-500 font-normal">點</span></p>
        </div>
        <button 
          onClick={() => setActiveTab('offers')}
          className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-emerald-200 transition active:scale-95"
        >
          兌換好禮
        </button>
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-4 p-6">
      <button 
        onClick={() => setActiveTab('map')}
        className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2 hover:shadow-md transition active:scale-95"
      >
        <div className="bg-emerald-100 p-3 rounded-full text-emerald-600"><MapPin size={24} /></div>
        <span className="font-medium text-gray-700">尋找歸還點</span>
      </button>
      <button 
        onClick={() => showModal({ title: '開啟相機', content: '即將要求相機權限，以掃描包裝上的 QR Code。', type: 'alert' })}
        className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2 hover:shadow-md transition active:scale-95"
      >
        <div className="bg-teal-100 p-3 rounded-full text-teal-600"><ArrowRightLeft size={24} /></div>
        <span className="font-medium text-gray-700">掃碼租借</span>
      </button>
    </div>

    <div className="px-6 mt-2">
      <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
        <BookOpen size={20} className="text-emerald-500" /> 探索綠色生活
      </h2>
      <div className="flex flex-col gap-4">
        {MOCK_ARTICLES.map(article => (
          <div key={article.id} onClick={() => window.open(article.link, '_blank')}className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex cursor-pointer hover:shadow-md transition active:scale-[0.98]">
            <div className={`w-24 ${article.image} flex items-center justify-center`}><Leaf className="text-white/50" size={32} /></div>
            <div className="p-4 flex-1">
              <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2">{article.title}</h3>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{article.date}</span>
                <span className="flex items-center gap-1"><Clock size={12}/> {article.readTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const MapView = ({ showModal }: ViewProps) => {
  const openGoogleMaps = (name: string, address: string) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' ' + address)}`, '_blank');
  };

  return (
    <div className="h-screen w-full relative animate-in fade-in duration-300 pb-20 bg-[#F0EBE1]">
      <div className="absolute top-0 w-full z-20 bg-white/90 backdrop-blur-md px-6 py-4 shadow-sm">
        <h1 className="text-xl font-bold text-gray-800">歸還點地圖</h1>
        <p className="text-xs text-gray-500 mt-1">尋找您附近的合作據點</p>
      </div>
      
      {/* 擬真地圖背景 */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(#d1d5db 2px, transparent 2px), linear-gradient(90deg, #d1d5db 2px, transparent 2px)', 
             backgroundSize: '40px 40px',
             backgroundColor: '#E5E3DF'
           }}>
      </div>
      
      {/* 動態渲染地圖標記 */}
      {MOCK_LOCATIONS.map(loc => (
        <div 
          key={loc.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-10"
          style={{ top: `${loc.y}%`, left: `${loc.x}%` }}
          onClick={() => {
            showModal({
              title: loc.name,
              content: `距離您約 ${loc.distance}\n地址：${loc.address}\n提供服務：${loc.status}`,
              type: 'confirm',
              confirmText: '在 Google Maps 開啟',
              onConfirm: () => openGoogleMaps(loc.name, loc.address)
            });
          }}
        >
          <div className={`p-2 rounded-full shadow-lg border-2 border-white transition-transform group-hover:scale-110 active:scale-95 ${loc.type.includes('洗衣') ? 'bg-blue-500 text-white' : 'bg-emerald-600 text-white'}`}>
            {loc.type.includes('洗衣') ? <Store size={18} /> : <MapPin size={18} />}
          </div>
          <div className="bg-white text-[11px] font-bold px-2 py-1 rounded shadow-md mt-1 text-gray-800 opacity-90 whitespace-nowrap border border-gray-100">
            {loc.name}
          </div>
        </div>
      ))}
    </div>
  );
};

const OffersView = ({ points, setPoints, redeemedItems, setRedeemedItems, setActiveTab, showModal }: ViewProps) => {
  const handleRedeem = (reward: any) => {
    if (points >= reward.points) {
      showModal({
        title: '確認兌換',
        content: `確定要花費 ${reward.points} 點，兌換【${reward.title}】嗎？\n(兌換後剩餘 ${points - reward.points} 點)`,
        type: 'confirm',
        confirmText: '確認兌換',
        onConfirm: () => {
          setPoints(points - reward.points);
          const newItem = { 
            ...reward, 
            redeemId: `RDM${Math.floor(Math.random() * 1000000)}`,
            redeemDate: new Date().toISOString().split('T')[0]
          };
          setRedeemedItems([newItem, ...redeemedItems]);
          showModal({ 
            title: '🎉 兌換成功！', 
            content: `已成功兌換【${reward.title}】\n請至「已兌換禮品」查看您的票券條碼。`, 
            type: 'alert' 
          });
        }
      });
    } else {
      showModal({ title: '點數不足', content: `您還差 ${reward.points - points} 點才能兌換此禮品，繼續加油累積點數吧！`, type: 'alert' });
    }
  };

  return (
    <div className="pb-24 animate-in fade-in duration-300">
      <div className="bg-emerald-600 px-6 pt-10 pb-20 text-center rounded-b-[40px] shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl pointer-events-none"></div>
        <h1 className="text-white font-medium mb-2 relative z-10">目前累積點數</h1>
        <div className="flex items-center justify-center gap-2 relative z-10">
          <Gift className="text-emerald-200" size={32} />
          <span className="text-5xl font-extrabold text-white tracking-tight">{points}</span>
          <span className="text-emerald-100 mt-4">pt</span>
        </div>
      </div>
      
      <div className="-mt-12 px-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 mb-8 flex justify-around">
          <div className="text-center w-1/2">
            <div className="text-gray-500 text-xs mb-1">即將到期</div>
            <div className="font-bold text-gray-800">0 pt</div>
          </div>
          <div className="w-px bg-gray-200 my-2"></div>
          <div 
            className="text-center w-1/2 cursor-pointer hover:bg-emerald-50 rounded-lg transition active:scale-95 py-1"
            onClick={() => setActiveTab('redeemedList')}
          >
            <div className="text-gray-500 text-xs mb-1">已兌換禮品</div>
            <div className="font-bold text-emerald-600 flex justify-center items-center gap-1">
              {redeemedItems.length} 項 <ExternalLink size={12} />
            </div>
          </div>
        </div>

        <h2 className="text-lg font-bold text-gray-800 mb-4 px-1">可兌換優惠與禮品</h2>
        <div className="grid gap-4">
          {MOCK_REWARDS.map(reward => (
            <div key={reward.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${reward.type === 'coupon' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                  {reward.type === 'coupon' ? <CreditCard size={24} /> : <Gift size={24} />}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm mb-1">{reward.title}</h3>
                  <p className="text-xs text-gray-500">{reward.type === 'coupon' ? `期限: ${reward.validUntil}` : `剩餘: ${reward.stock}`}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 pl-2">
                <span className="text-emerald-600 font-bold text-sm whitespace-nowrap">{reward.points} pt</span>
                <button 
                  onClick={() => handleRedeem(reward)}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition whitespace-nowrap active:scale-95 ${points >= reward.points ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' : 'bg-gray-100 text-gray-400'}`}
                >
                  兌換
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- 全新獨立的「已兌換清單」畫面 ---
const RedeemedListView = ({ setActiveTab, redeemedItems, showModal }: ViewProps) => (
  <div className="pb-24 animate-in slide-in-from-right-8 duration-300 h-full flex flex-col bg-gray-50">
    <div className="bg-white px-4 pt-8 pb-4 shadow-sm z-10 sticky top-0 flex items-center gap-3">
      <button onClick={() => setActiveTab('offers')} className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition active:scale-95">
        <ChevronLeft size={24} />
      </button>
      <h1 className="text-xl font-bold text-gray-800">我的票券夾</h1>
    </div>
    
    <div className="p-6 flex-1 overflow-y-auto">
      {redeemedItems.length === 0 ? (
        <div className="text-center text-gray-500 mt-20 flex flex-col items-center gap-4">
          <Ticket size={48} className="text-gray-300" />
          <p>您目前還沒有兌換任何禮品喔！</p>
          <button onClick={() => setActiveTab('offers')} className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-full font-medium">去逛逛</button>
        </div>
      ) : (
        <div className="space-y-4">
          {redeemedItems.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-start gap-4">
                 <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600">
                    <Gift size={24} />
                 </div>
                 <div className="flex-1">
                    <h3 className="font-bold text-gray-800 text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-500">兌換日期: {item.redeemDate}</p>
                 </div>
              </div>
              <div className="bg-gray-50 p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition" 
                   onClick={() => showModal({ title: item.title, content: `請將此條碼出示給店員掃描：\n\n|||| | || || | || | ||\n${item.redeemId}`, type: 'alert' })}>
                <QrCode size={40} className="text-gray-800 mb-2" />
                <span className="text-xs font-mono text-gray-600 tracking-widest">{item.redeemId}</span>
                <span className="text-[10px] text-emerald-600 mt-2 flex items-center gap-1"><CheckCircle2 size={12}/> 點擊放大顯示</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

// --- 會員中心 ---
const MemberCenterView = ({ showModal }: ViewProps) => {
  const [historyTab, setHistoryTab] = useState('rentals');
  return (
    <div className="pb-24 animate-in fade-in duration-300">
      <div className="bg-gray-50 px-6 pt-10 pb-6 mb-2">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">會員中心</h1>
        <div className="bg-[#1C2331] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-3xl font-light">
              {MOCK_USER.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold">{MOCK_USER.name}</h2>
              <p className="text-gray-400 text-sm mt-2 flex items-center gap-2">
                會員代碼: <span className="font-mono text-gray-200 bg-black/40 px-2 py-0.5 rounded text-xs">{MOCK_USER.memberCode}</span>
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700/50 pt-4 flex justify-between items-center relative z-10">
             <span className="text-sm text-gray-300">目前等級: <strong className="text-emerald-400 font-medium">綠色大使</strong></span>
             <button 
                onClick={() => showModal({ title: '會員專屬條碼', content: `|| || | || || | || | ||\n${MOCK_USER.memberCode}`, type: 'alert' })}
                className="text-xs bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-full transition text-gray-200 active:scale-95"
             >
               查看條碼
             </button>
          </div>
        </div>
      </div>
      <div className="px-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">使用紀錄</h2>
        <div className="flex gap-6 border-b border-gray-200 mb-6">
          <button onClick={() => setHistoryTab('rentals')} className={`pb-3 text-sm font-medium transition-colors relative ${historyTab === 'rentals' ? 'text-emerald-600' : 'text-gray-500'}`}>
            租借紀錄 {historyTab === 'rentals' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 rounded-t-full"></div>}
          </button>
          <button onClick={() => setHistoryTab('returns')} className={`pb-3 text-sm font-medium transition-colors relative ${historyTab === 'returns' ? 'text-emerald-600' : 'text-gray-500'}`}>
            歸還紀錄 {historyTab === 'returns' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 rounded-t-full"></div>}
          </button>
        </div>
        <div className="space-y-4">
          {historyTab === 'rentals' ? (
            MOCK_HISTORY.rentals.map(record => (
              <div key={record.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
                <div className="bg-orange-100 p-3 rounded-full text-orange-500 shrink-0"><ArrowRightLeft size={20} /></div>
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-gray-800 text-sm">{record.item}</h4>
                    <span className="text-xs text-gray-400">{record.date.split(' ')[0]}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-1 flex items-center gap-1"><Store size={12} /> {record.store}</p>
                </div>
              </div>
            ))
          ) : (
            MOCK_HISTORY.returns.map(record => (
              <div key={record.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-full text-green-500 shrink-0"><Leaf size={20} /></div>
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-gray-800 text-sm">{record.item}</h4>
                    <span className="text-xs text-gray-400">{record.date.split(' ')[0]}</span>
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-1"><Store size={12} /> {record.store}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// --- 主程式 & 全域狀態管理 ---
export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [points, setPoints] = useState(50);
  const [redeemedItems, setRedeemedItems] = useState<any[]>([]);
  
  // Custom Modal State
  const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null);

  const sharedProps = { 
    setActiveTab, 
    points, 
    setPoints, 
    redeemedItems, 
    setRedeemedItems, 
    showModal: setModalConfig 
  };

  const renderView = () => {
    switch (activeTab) {
      case 'home': return <HomeView {...sharedProps} />;
      case 'map': return <MapView {...sharedProps} />;
      case 'offers': return <OffersView {...sharedProps} />;
      case 'redeemedList': return <RedeemedListView {...sharedProps} />;
      case 'member': return <MemberCenterView {...sharedProps} />;
      default: return <HomeView {...sharedProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col md:flex-row-reverse md:justify-end selection:bg-emerald-200">
      <div className="flex-1 w-full md:max-w-md md:mx-auto relative flex flex-col h-screen overflow-hidden bg-gray-50 md:border-x md:border-gray-200 md:shadow-lg">
        
        {/* 主要內容區 */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative">
          {renderView()}
        </div>

        {/* --- 自訂的彈跳視窗 (Modal) Overlay --- */}
        {modalConfig && (
          <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-6 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{modalConfig.title}</h3>
                  <button onClick={() => setModalConfig(null)} className="p-1 bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200 transition">
                    <X size={18} />
                  </button>
                </div>
                <p className="text-gray-600 text-sm whitespace-pre-line leading-relaxed mb-8">
                  {modalConfig.content}
                </p>
                <div className="flex gap-3">
                  {modalConfig.type === 'confirm' && (
                    <button 
                      onClick={() => setModalConfig(null)}
                      className="flex-1 py-3 rounded-xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition active:scale-95"
                    >
                      取消
                    </button>
                  )}
                  <button 
                    onClick={() => {
                      if (modalConfig.onConfirm) modalConfig.onConfirm();
                      setModalConfig(null);
                    }}
                    className="flex-1 py-3 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-200 transition active:scale-95"
                  >
                    {modalConfig.confirmText || '我知道了'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部導覽列 */}
      <nav className="fixed md:static bottom-0 w-full md:w-64 bg-white border-t md:border-t-0 md:border-r border-gray-200 pb-safe z-50 md:h-screen md:pt-8 md:pb-8 flex md:flex-col">
        <div className="hidden md:block px-8 mb-10 text-emerald-600 font-bold text-2xl">GreenLink</div>
        <div className="flex md:flex-col justify-around md:justify-start items-center md:items-start h-16 md:h-auto px-2 md:px-4 md:space-y-4 w-full">
          {[
            { id: 'home', icon: Home, label: '主頁' },
            { id: 'map', icon: MapIcon, label: '地圖' },
            { id: 'offers', icon: Gift, label: '優惠' },
            { id: 'member', icon: User, label: '會員' },
          ].map((tab) => {
            const Icon = tab.icon;
            // 讓「已兌換清單」視窗時，優惠圖示依然保持 active 狀態
            const isActive = activeTab === tab.id || (activeTab === 'redeemedList' && tab.id === 'offers');
            return (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col md:flex-row items-center md:justify-start w-full h-full md:h-auto md:p-3 md:rounded-xl space-y-1 md:space-y-0 md:space-x-4 transition-colors ${isActive ? 'text-emerald-600 md:bg-emerald-50' : 'text-gray-400 hover:text-gray-600 md:hover:bg-gray-50'}`}
              >
                <Icon size={22} className={isActive ? 'fill-emerald-100' : ''} />
                <span className="text-[10px] md:text-sm font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .pb-safe { padding-bottom: env(safe-area-inset-bottom); }
      `}} />
    </div>
  );
}