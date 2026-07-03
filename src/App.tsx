import { useState } from 'react';
import {
  Home,
  Map as MapIcon,
  Gift,
  User,
  Leaf,
  MapPin,
  Store,
  Clock,
  BookOpen,
  ArrowRightLeft,
  X,
  ExternalLink,
  Ticket,
  CheckCircle2,
  QrCode,
  ChevronLeft,
  Shirt,
  Package,
  Wallet,
  ShoppingBag,
  History,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';

// --- Mock Data 靜態模擬資料 ---
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
    link: 'https://e-info.org.tw/node/243546',
  },
  {
    id: 2,
    title: '循環袋、循環箱真的環保？一篇看懂配客嘉綠色物流：PLUS循環圈',
    date: '2024-04-25',
    readTime: '6 min',
    image: 'bg-emerald-100',
    link: 'https://package-plus.com/2024/04/package-circular-system/',
  },
  {
    id: 3,
    title: '為什麼要減塑？瞭解2大減塑好處與企業作為，阻止塑膠污染空氣和食物',
    date: '2023-08-16',
    readTime: '8 min',
    image: 'bg-teal-100',
    link: 'https://package-plus.com/2023/08/2-reasons-to-reduce-plastic-waste/',
  },
];

const MOCK_LOCATIONS = [
  {
    id: 1,
    name: '全家 永平店',
    address: '新北市永和區永平路1號',
    type: '合作便利商店',
    status: '可租借 / 可歸還',
    distance: '120m',
    x: 40,
    y: 35,
  },
  {
    id: 2,
    name: '衣級洗衣坊',
    address: '新北市永和區中山路一段50號',
    type: '合作洗衣店',
    status: '可租借 / 可歸還',
    distance: '250m',
    x: 75,
    y: 25,
  },
  {
    id: 3,
    name: '全家 頂溪店',
    address: '新北市永和區永和路二段2號',
    type: '合作便利商店',
    status: '僅限歸還',
    distance: '350m',
    x: 60,
    y: 55,
  },
  {
    id: 4,
    name: '7-11 頂溪門市',
    address: '新北市永和區文化路10號',
    type: '合作便利商店',
    status: '僅限歸還',
    distance: '400m',
    x: 30,
    y: 65,
  },
];

const MOCK_REWARDS = [
  {
    id: 1,
    title: '50元 環保商品折價券',
    type: 'coupon',
    points: 10,
    validUntil: '2026-12-31',
  },
  {
    id: 2,
    title: '免費升級星衣客大杯飲品',
    type: 'coupon',
    points: 20,
    validUntil: '2026-08-31',
  },
  {
    id: 3,
    title: '環保洗手乳禮盒',
    type: 'gift',
    points: 200,
    stock: 12,
  },
  {
    id: 4,
    title: '50元 洗衣折扣券',
    type: 'gift',
    points: 50,
    stock: 5,
  },
];

const MOCK_HISTORY = {
  rentals: [
    {
      id: 'R1001',
      date: '2026-06-05 14:30',
      store: '全家 永平店',
      item: '配客嘉循環袋',
    },
    {
      id: 'R1002',
      date: '2026-05-20 12:15',
      store: '全家 頂溪店',
      item: '配客嘉循環箱',
    },
  ],
  returns: [
    {
      id: 'T1001',
      date: '2026-06-06 09:00',
      store: '7-11 頂溪門市',
      item: 'A型循環餐盒',
      earnedPoints: 10,
    },
    {
      id: 'T1002',
      date: '2026-05-22 18:40',
      store: '無包裝商店 永和店',
      item: 'B型循環購物袋',
      earnedPoints: 15,
    },
  ],
};

//// --- 洗衣店專屬模擬資料 ---
type LaundryOrderStatus = '清洗中' | '包裝中' | '待取件' | '完成取件';

interface LaundryItem {
  id: string;
  name: string;
  price: number;
}

interface LaundryOrder {
  id: string;
  status: LaundryOrderStatus;
  bagCode: string;
  items: LaundryItem[];
}

interface LaundryHistoryRecord {
  date: string;
  desc: string;
  cost: number;
}

interface LaundryStore {
  id: string;
  name: string;
  balance: number;
  storePoints: number;
  unreturnedBagCodes: string[];
  lastWashDate: string;
  currentOrder: LaundryOrder | null;
  history: LaundryHistoryRecord[];
}

const MOCK_LAUNDRY_DATA: LaundryStore[] = [
  {
    id: 'L1',
    name: '衣級洗衣坊 (永和店)',
    balance: 500,
    storePoints: 120,
    unreturnedBagCodes: ['BAG-0007'],
    lastWashDate: '2026-06-25',
    currentOrder: {
      id: 'W-20260702-01',
      status: '待取件',
      bagCode: 'BAG-0008',
      items: [
        {
          id: 'C-0001',
          name: '冬季羊毛大衣',
          price: 450,
        },
        {
          id: 'C-0002',
          name: '法蘭絨襯衫',
          price: 100,
        },
        {
          id: 'C-0003',
          name: '羽絨外套',
          price: 450,
        },
      ],
    },
    history: [
      {
        date: '2026-05-10',
        desc: '一般衣物水洗 5 件',
        cost: 500,
      },
      {
        date: '2026-04-22',
        desc: '西裝乾洗 2 件',
        cost: 500,
      },
    ],
  },
  {
    id: 'L2',
    name: '淨白洗衣 (頂溪店)',
    balance: 150,
    storePoints: 30,
    unreturnedBagCodes: [],
    lastWashDate: '2026-03-15',
    currentOrder: null,
    history: [
      {
        date: '2026-03-15',
        desc: '床單被套組',
        cost: 500,
      },
    ],
  },
];

const LAUNDRY_USAGE_STEPS = [
  {
    title: '送洗時使用循環衣袋',
    desc: '將衣物交給合作洗衣店時，可使用店家提供或已綁定的循環衣袋裝袋。',
    icon: ShoppingBag,
  },
  {
    title: '系統綁定衣袋編碼',
    desc: '店家會把 BAG-xxxx 衣袋編碼綁定到本次送洗訂單，會員可即時查看。',
    icon: QrCode,
  },
  {
    title: '查看清洗進度',
    desc: '會員可在洗衣服務專區查看清洗中、包裝中、待取件、完成取件等狀態。',
    icon: Clock,
  },
  {
    title: '取件後記得歸還',
    desc: '取件後可於下次送洗時帶回，或依店家規則歸還至合作據點。',
    icon: CheckCircle2,
  },
];

const LAUNDRY_FAQS = [
  {
    question: '循環衣袋是什麼？',
    answer:
      '循環衣袋是可以重複使用的送洗包材，用來取代一次性塑膠袋，讓衣物從送洗、清洗、取件到歸還都能被追蹤。',
  },
  {
    question: 'BAG-xxxx 跟 C-xxxx 差在哪？',
    answer:
      'BAG-xxxx 是循環衣袋編碼，代表「袋子」；C-xxxx 是衣物編號，代表「單件衣物」。一個衣袋裡可能會有多件衣物。',
  },
  {
    question: '為什麼要綁定衣袋編碼？',
    answer:
      '綁定衣袋編碼後，系統可以知道這個衣袋目前在哪一筆訂單中，也能提醒會員是否還有未歸還的循環衣袋。',
  },
  {
    question: '忘記歸還衣袋怎麼辦？',
    answer:
      '會員頁面會顯示未歸還提醒。下次送洗時把衣袋帶回合作洗衣店，店家確認後即可更新歸還狀態。',
  },
  {
    question: '衣袋一定要馬上歸還嗎？',
    answer:
      '建議取件後盡快歸還，避免影響後續循環使用。如果店家有設定歸還期限，請依店家規定辦理。',
  },
];

interface ModalConfig {
  title: string;
  content: string;
  type?: 'alert' | 'confirm';
  confirmText?: string;
  onConfirm?: () => void;
}

interface RedeemedItem {
  id: number;
  title: string;
  type: string;
  points: number;
  validUntil?: string;
  stock?: number;
  redeemId: string;
  redeemDate: string;
}

interface ViewProps {
  setActiveTab: (tab: string) => void;
  points: number;
  setPoints: (p: number) => void;
  redeemedItems: RedeemedItem[];
  setRedeemedItems: (items: RedeemedItem[]) => void;
  showModal: (config: ModalConfig) => void;
}

const formatCurrency = (amount: number) => `$${amount.toLocaleString('zh-TW')}`;

const HomeView = ({ setActiveTab, points, showModal }: ViewProps) => (
  <div className="space-y-6">
    <section className="bg-gradient-to-br from-emerald-500 to-green-600 text-white rounded-3xl p-6 shadow-lg shadow-emerald-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-emerald-50">早安，{MOCK_USER.name}</p>
          <h1 className="text-2xl font-bold mt-1">今天也是愛地球的一天</h1>
        </div>
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <Leaf size={28} />
        </div>
      </div>

      <div className="mt-6 bg-white/15 rounded-2xl p-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-emerald-50">我的配客點</p>
          <p className="text-3xl font-bold">{points} 點</p>
        </div>
        <button
          onClick={() => setActiveTab('offers')}
          className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-emerald-200 transition active:scale-95"
        >
          兌換好禮
        </button>
      </div>
    </section>

    <section className="grid grid-cols-2 gap-4">
      <button
        onClick={() => setActiveTab('map')}
        className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2 hover:shadow-md transition active:scale-95"
      >
        <MapPin className="text-emerald-600" />
        <span className="font-semibold text-gray-700">尋找歸還點</span>
      </button>

      <button
        onClick={() =>
          showModal({
            title: '開啟相機',
            content: '即將要求相機權限，以掃描包裝上的 QR Code。',
            type: 'alert',
          })
        }
        className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2 hover:shadow-md transition active:scale-95"
      >
        <QrCode className="text-emerald-600" />
        <span className="font-semibold text-gray-700">掃碼租借</span>
      </button>
    </section>

    <section>
      <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
        <BookOpen size={20} className="text-emerald-600" />
        探索綠色生活
      </h2>

      <div className="space-y-3">
        {MOCK_ARTICLES.map((article) => (
          <button
            key={article.id}
            onClick={() => window.open(article.link, '_blank')}
            className="w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex text-left cursor-pointer hover:shadow-md transition active:scale-[0.98]"
          >
            <div className={`w-24 ${article.image} flex items-center justify-center shrink-0`}>
              <Leaf className="text-emerald-600" />
            </div>
            <div className="p-4 flex-1">
              <h3 className="font-semibold text-gray-800 line-clamp-2">{article.title}</h3>
              <p className="text-xs text-gray-400 mt-2">
                {article.date}・{article.readTime}
              </p>
            </div>
            <ExternalLink size={16} className="text-gray-300 m-4 shrink-0" />
          </button>
        ))}
      </div>
    </section>
  </div>
);

const MapView = ({ showModal }: ViewProps) => {
  const openGoogleMaps = (name: string, address: string) => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name} ${address}`)}`,
      '_blank',
    );
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">歸還點地圖</h1>
        <p className="text-gray-500 mt-1">尋找您附近的合作據點</p>
      </div>

      <div className="relative h-72 bg-emerald-50 rounded-3xl overflow-hidden border border-emerald-100">
        <div className="absolute inset-0 opacity-60">
          <div className="absolute top-10 left-8 w-56 h-24 bg-white rounded-full blur-xl" />
          <div className="absolute bottom-8 right-8 w-40 h-40 bg-emerald-200 rounded-full blur-2xl" />
        </div>

        {MOCK_LOCATIONS.map((loc) => (
          <button
            key={loc.id}
            onClick={() =>
              showModal({
                title: loc.name,
                content: `距離您約 ${loc.distance}\n地址：${loc.address}\n提供服務：${loc.status}`,
                type: 'confirm',
                confirmText: '在 Google Maps 開啟',
                onConfirm: () => openGoogleMaps(loc.name, loc.address),
              })
            }
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
          >
            <div className="bg-white shadow-lg rounded-full p-3 border border-emerald-100">
              {loc.type.includes('洗衣') ? (
                <Shirt size={20} className="text-emerald-600" />
              ) : (
                <Store size={20} className="text-emerald-600" />
              )}
            </div>
            <p className="mt-1 text-xs font-semibold bg-white px-2 py-1 rounded-full shadow-sm whitespace-nowrap">
              {loc.name}
            </p>
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {MOCK_LOCATIONS.map((loc) => (
          <button
            key={loc.id}
            onClick={() =>
              showModal({
                title: loc.name,
                content: `距離您約 ${loc.distance}\n地址：${loc.address}\n提供服務：${loc.status}`,
                type: 'confirm',
                confirmText: '在 Google Maps 開啟',
                onConfirm: () => openGoogleMaps(loc.name, loc.address),
              })
            }
            className="w-full bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-3 text-left hover:shadow-md transition active:scale-[0.98]"
          >
            <div className="w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
              {loc.type.includes('洗衣') ? (
                <Shirt size={20} className="text-emerald-600" />
              ) : (
                <Store size={20} className="text-emerald-600" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800">{loc.name}</h3>
              <p className="text-sm text-gray-500">{loc.address}</p>
              <p className="text-xs text-emerald-600 mt-1">{loc.status}</p>
            </div>
            <span className="text-sm text-gray-400">{loc.distance}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const OffersView = ({
  points,
  setPoints,
  redeemedItems,
  setRedeemedItems,
  setActiveTab,
  showModal,
}: ViewProps) => {
  const handleRedeem = (reward: (typeof MOCK_REWARDS)[number]) => {
    if (points >= reward.points) {
      showModal({
        title: '確認兌換',
        content: `確定要花費 ${reward.points} 點，兌換〖${reward.title}〗嗎？\n兌換後剩餘 ${points - reward.points} 點。`,
        type: 'confirm',
        confirmText: '確認兌換',
        onConfirm: () => {
          setPoints(points - reward.points);

          const newItem: RedeemedItem = {
            ...reward,
            redeemId: `RDM${Math.floor(Math.random() * 1000000)}`,
            redeemDate: new Date().toISOString().split('T')[0],
          };

          setRedeemedItems([newItem, ...redeemedItems]);

          showModal({
            title: '兌換成功！',
            content: `已成功兌換〖${reward.title}〗\n請至「已兌換禮品」查看您的票券條碼。`,
            type: 'alert',
          });
        },
      });
    } else {
      showModal({
        title: '點數不足',
        content: `您還差 ${reward.points - points} 點才能兌換此禮品，繼續加油累積點數吧！`,
        type: 'alert',
      });
    }
  };

  return (
    <div className="space-y-5">
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-emerald-600 text-white rounded-2xl p-5 shadow-md shadow-emerald-100">
          <p className="text-sm text-emerald-50">目前累積點數</p>
          <p className="text-3xl font-bold mt-1">{points} pt</p>
        </div>

        <button
          onClick={() => setActiveTab('redeemedList')}
          className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-left hover:shadow-md transition active:scale-95"
        >
          <Ticket className="text-emerald-600 mb-2" />
          <p className="font-bold text-gray-800">已兌換禮品</p>
          <p className="text-sm text-gray-500">{redeemedItems.length} 項</p>
        </button>
      </section>

      <section>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">可兌換優惠與禮品</h1>

        <div className="space-y-3">
          {MOCK_REWARDS.map((reward) => (
            <div
              key={reward.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                {reward.type === 'coupon' ? (
                  <Ticket className="text-emerald-600" />
                ) : (
                  <Gift className="text-emerald-600" />
                )}
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{reward.title}</h3>
                <p className="text-sm text-gray-500">
                  {reward.type === 'coupon'
                    ? `期限：${reward.validUntil}`
                    : `剩餘：${reward.stock}`}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm font-bold text-emerald-600">{reward.points} pt</p>
                <button
                  onClick={() => handleRedeem(reward)}
                  className={`text-xs px-3 py-1.5 rounded-full font-medium transition whitespace-nowrap active:scale-95 ${
                    points >= reward.points
                      ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  兌換
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const RedeemedListView = ({ setActiveTab, redeemedItems, showModal }: ViewProps) => (
  <div className="space-y-5">
    <div className="flex items-center gap-2">
      <button
        onClick={() => setActiveTab('offers')}
        className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition active:scale-95"
      >
        <ChevronLeft />
      </button>
      <h1 className="text-2xl font-bold text-gray-800">我的票券夾</h1>
    </div>

    {redeemedItems.length === 0 ? (
      <div className="bg-white border border-gray-100 rounded-3xl p-8 text-center shadow-sm">
        <Ticket size={44} className="mx-auto text-gray-300 mb-3" />
        <p className="text-gray-500">您目前還沒有兌換任何禮品喔！</p>
        <button
          onClick={() => setActiveTab('offers')}
          className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-full font-medium"
        >
          去逛逛
        </button>
      </div>
    ) : (
      <div className="space-y-3">
        {redeemedItems.map((item) => (
          <div
            key={item.redeemId}
            className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm"
          >
            <h3 className="font-bold text-gray-800">{item.title}</h3>
            <p className="text-sm text-gray-500 mt-1">兌換日期：{item.redeemDate}</p>
            <button
              onClick={() =>
                showModal({
                  title: item.title,
                  content: `請將此條碼出示給店員掃描：\n\n|||| | || || | || | ||\n${item.redeemId}`,
                  type: 'alert',
                })
              }
              className="mt-3 w-full bg-gray-50 rounded-xl p-3 text-sm font-mono text-gray-700"
            >
              {item.redeemId} 點擊放大顯示
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);

const LaundryServiceView = ({ setActiveTab, showModal }: ViewProps) => {
  const [selectedStoreId, setSelectedStoreId] = useState<string>(
    MOCK_LAUNDRY_DATA[0].id,
  );

  const [showBagGuide, setShowBagGuide] = useState(false);

  const storeData =
    MOCK_LAUNDRY_DATA.find((store) => store.id === selectedStoreId) ??
    MOCK_LAUNDRY_DATA[0];

  const PROGRESS_STEPS: LaundryOrderStatus[] = [
    '清洗中',
    '包裝中',
    '待取件',
    '完成取件',
  ];

  const currentOrder = storeData.currentOrder;

  const currentStepIndex = currentOrder
    ? PROGRESS_STEPS.indexOf(currentOrder.status)
    : -1;

  const currentOrderTotal = currentOrder
    ? currentOrder.items.reduce((sum, item) => sum + item.price, 0)
    : 0;

  if (showBagGuide) {
    return (
      <div className="space-y-5 pb-24">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowBagGuide(false)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition active:scale-95"
          >
            <ChevronLeft size={24} />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              衣袋使用說明
            </h1>
            <p className="text-sm text-gray-500">
              認識循環衣袋、衣袋編碼與歸還方式
            </p>
          </div>
        </div>

        <section className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={20} className="text-emerald-600" />
            <h3 className="text-lg font-bold text-gray-900">
              衣袋使用說明
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {LAUNDRY_USAGE_STEPS.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className="bg-emerald-50/70 rounded-2xl p-4 border border-emerald-100"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <Icon size={18} />
                    </div>

                    <div>
                      <p className="text-xs font-bold text-emerald-600 mb-1">
                        STEP {index + 1}
                      </p>
                      <h4 className="font-bold text-gray-900 text-sm">
                        {step.title}
                      </h4>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle size={20} className="text-emerald-600" />
            <h3 className="text-lg font-bold text-gray-900">常見問題 QA</h3>
          </div>

          <div className="space-y-3">
            {LAUNDRY_FAQS.map((faq) => (
              <button
                key={faq.question}
                onClick={() =>
                  showModal({
                    title: faq.question,
                    content: faq.answer,
                    type: 'alert',
                  })
                }
                className="w-full bg-gray-50 hover:bg-gray-100 rounded-2xl p-4 text-left transition active:scale-[0.98] flex items-center justify-between gap-3"
              >
                <span className="font-semibold text-gray-800 text-sm">
                  {faq.question}
                </span>
                <BookOpen size={17} className="text-gray-400 shrink-0" />
              </button>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-24">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveTab('member')}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition active:scale-95"
        >
          <ChevronLeft size={24} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">洗衣服務專區</h1>
          <p className="text-sm text-gray-500">
            查看清洗進度、循環衣袋與使用說明
          </p>
        </div>
      </div>

      <button
        onClick={() => setShowBagGuide(true)}
        className="w-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl p-5 text-white shadow-lg shadow-emerald-100 transition active:scale-[0.98] hover:shadow-xl"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-left">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <Shirt size={26} />
            </div>

            <div>
              <p className="text-sm text-emerald-50">合作洗衣服務</p>
              <h2 className="text-xl font-bold">
                查看清洗進度與循環衣袋
              </h2>
              <p className="text-xs text-emerald-50 mt-1">
                點我查看衣袋使用說明與常見問題
              </p>
            </div>
          </div>

          <ChevronRight size={24} className="text-white/80 shrink-0" />
        </div>
      </button>

      <section>
        <p className="text-sm font-semibold text-gray-700 mb-2">
          選擇合作洗衣店
        </p>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {MOCK_LAUNDRY_DATA.map((store) => (
            <button
              key={store.id}
              onClick={() => setSelectedStoreId(store.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors border ${
                selectedStoreId === store.id
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-100'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {store.name}
            </button>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Wallet size={17} />
            店內儲值金
          </div>
          <p className="text-xl font-bold text-gray-900">
            {formatCurrency(storeData.balance)}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <Leaf size={17} />
            獲得配客點
          </div>
          <p className="text-xl font-bold text-emerald-600">
            {storeData.storePoints} pt
          </p>
        </div>
      </div>

      {storeData.unreturnedBagCodes.length > 0 && (
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />

            <div>
              <h4 className="font-bold text-amber-800">
                未歸還循環衣袋提醒
              </h4>
              <p className="text-sm text-amber-700 mt-1 leading-relaxed">
                您目前有 {storeData.unreturnedBagCodes.length}{' '}
                個循環衣袋尚未歸還，下次送洗時記得帶回喔！
              </p>

              <div className="flex flex-wrap gap-2 mt-3">
                {storeData.unreturnedBagCodes.map((code) => (
                  <span
                    key={code}
                    className="bg-white border border-amber-200 text-amber-700 px-3 py-1 rounded-full text-xs font-bold"
                  >
                    {code}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Package size={20} className="text-emerald-600" />
            <h3 className="text-lg font-bold text-gray-900">當次送洗訂單</h3>
          </div>

          {currentOrder && (
            <span className="text-xs bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full font-bold">
              {currentOrder.status}
            </span>
          )}
        </div>

        {currentOrder ? (
          <>
            <div className="bg-gray-50 rounded-2xl p-4 mb-5">
              <p className="text-xs text-gray-500">訂單編號</p>
              <p className="font-bold text-gray-900 mt-1">{currentOrder.id}</p>

              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500">本次循環衣袋編碼</p>
                <p className="font-mono font-bold text-emerald-600 mt-1">
                  {currentOrder.bagCode}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-start justify-between gap-2">
                {PROGRESS_STEPS.map((step, index) => {
                  const isActive = index <= currentStepIndex;
                  const isCurrent = index === currentStepIndex;

                  return (
                    <div
                      key={step}
                      className="flex-1 flex flex-col items-center text-center relative"
                    >
                      {index < PROGRESS_STEPS.length - 1 && (
                        <div
                          className={`absolute top-4 left-1/2 w-full h-0.5 ${
                            index < currentStepIndex
                              ? 'bg-emerald-500'
                              : 'bg-gray-200'
                          }`}
                        />
                      )}

                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold z-10 ${
                          isActive
                            ? 'bg-emerald-600 text-white'
                            : 'bg-gray-200 text-gray-400'
                        }`}
                      >
                        {isActive ? '✓' : index + 1}
                      </div>

                      <p
                        className={`text-xs mt-2 font-medium ${
                          isCurrent ? 'text-emerald-600' : 'text-gray-500'
                        }`}
                      >
                        {step}
                      </p>

                      {step === '待取件' && currentOrder.status === '待取件' && (
                        <p className="mt-1 text-[10px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-mono">
                          {currentOrder.bagCode}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-gray-900">清潔衣物明細</h4>
                <p className="text-sm text-gray-500">
                  合計 {formatCurrency(currentOrderTotal)}
                </p>
              </div>

              <div className="space-y-2">
                {currentOrder.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between bg-gray-50 rounded-2xl p-3"
                  >
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        衣物編號：{item.id}
                      </p>
                    </div>

                    <p className="font-bold text-gray-900">
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-gray-400">
            <Package size={36} className="mx-auto mb-2" />
            <p className="text-sm">目前沒有進行中的送洗訂單</p>
          </div>
        )}
      </section>

      <section className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <History size={20} className="text-emerald-600" />
          <h3 className="text-lg font-bold text-gray-900">歷次清洗紀錄</h3>
        </div>

        <div className="space-y-2">
          {storeData.history.map((record, index) => (
            <div
              key={`${record.date}-${index}`}
              className="flex items-center justify-between bg-gray-50 rounded-2xl p-3"
            >
              <div>
                <p className="font-semibold text-gray-800 text-sm">
                  {record.desc}
                </p>
                <p className="text-xs text-gray-500 mt-1">{record.date}</p>
              </div>

              <p className="font-bold text-gray-900">
                {formatCurrency(record.cost)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const MemberCenterView = ({ setActiveTab, showModal }: ViewProps) => {
  const [historyTab, setHistoryTab] = useState<'rentals' | 'returns'>('rentals');

  return (
    <div className="space-y-5">
      <section className="bg-gray-900 text-white rounded-3xl p-6 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center text-2xl font-black">
            {MOCK_USER.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{MOCK_USER.name}</h1>
            <p className="text-sm text-gray-300">會員代碼：{MOCK_USER.memberCode}</p>
            <p className="text-sm text-emerald-300 mt-1">目前等級：綠色大使</p>
          </div>
        </div>

        <button
          onClick={() =>
            showModal({
              title: '會員專屬條碼',
              content: `|| || | || || | || | ||\n${MOCK_USER.memberCode}`,
              type: 'alert',
            })
          }
          className="mt-5 text-xs bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition text-gray-200 active:scale-95"
        >
          查看條碼
        </button>
      </section>

      <button
        onClick={() => setActiveTab('laundry')}
        className="w-full bg-emerald-600 text-white rounded-2xl p-4 shadow-md shadow-emerald-100 flex items-center justify-between hover:bg-emerald-700 transition active:scale-[0.98]"
      >
        <div className="flex items-center gap-3 text-left">
          <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center">
            <Shirt />
          </div>
          <div>
            <h3 className="font-bold">洗衣服務專區</h3>
            <p className="text-sm text-emerald-50">查看清洗進度、儲值金與未歸還衣袋</p>
          </div>
        </div>
        <ChevronLeft className="rotate-180" />
      </button>

      <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
        <h2 className="text-lg font-bold text-gray-800 mb-4">使用紀錄</h2>

        <div className="flex gap-5 border-b border-gray-100 mb-4">
          <button
            onClick={() => setHistoryTab('rentals')}
            className={`pb-3 text-sm font-medium transition-colors relative ${
              historyTab === 'rentals' ? 'text-emerald-600' : 'text-gray-500'
            }`}
          >
            租借紀錄
            {historyTab === 'rentals' && (
              <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-emerald-600 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setHistoryTab('returns')}
            className={`pb-3 text-sm font-medium transition-colors relative ${
              historyTab === 'returns' ? 'text-emerald-600' : 'text-gray-500'
            }`}
          >
            歸還紀錄
            {historyTab === 'returns' && (
              <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-emerald-600 rounded-full" />
            )}
          </button>
        </div>

        <div className="space-y-3">
          {historyTab === 'rentals'
            ? MOCK_HISTORY.rentals.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center gap-3 border-b border-gray-50 last:border-b-0 pb-3 last:pb-0"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                    <ShoppingBag size={18} className="text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{record.item}</h4>
                    <p className="text-sm text-gray-500">{record.store}</p>
                  </div>
                  <p className="text-xs text-gray-400">{record.date.split(' ')[0]}</p>
                </div>
              ))
            : MOCK_HISTORY.returns.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center gap-3 border-b border-gray-50 last:border-b-0 pb-3 last:pb-0"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                    <ArrowRightLeft size={18} className="text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{record.item}</h4>
                    <p className="text-sm text-gray-500">{record.store}</p>
                  </div>
                  <p className="text-xs text-gray-400">{record.date.split(' ')[0]}</p>
                </div>
              ))}
        </div>
      </section>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [points, setPoints] = useState(50);
  const [redeemedItems, setRedeemedItems] = useState<RedeemedItem[]>([]);
  const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null);

  const sharedProps: ViewProps = {
    setActiveTab,
    points,
    setPoints,
    redeemedItems,
    setRedeemedItems,
    showModal: setModalConfig,
  };

  const renderView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeView {...sharedProps} />;
      case 'map':
        return <MapView {...sharedProps} />;
      case 'offers':
        return <OffersView {...sharedProps} />;
      case 'redeemedList':
        return <RedeemedListView {...sharedProps} />;
      case 'member':
        return <MemberCenterView {...sharedProps} />;
      case 'laundry':
        return <LaundryServiceView {...sharedProps} />;
      default:
        return <HomeView {...sharedProps} />;
    }
  };

  const navTabs = [
    {
      id: 'home',
      icon: Home,
      label: '主頁',
    },
    {
      id: 'map',
      icon: MapIcon,
      label: '地圖',
    },
    {
      id: 'offers',
      icon: Gift,
      label: '優惠',
    },
    {
      id: 'member',
      icon: User,
      label: '會員',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-md md:max-w-5xl md:flex md:gap-6">
        <aside className="hidden md:block w-64 min-h-screen p-5 sticky top-0">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-4 h-full">
            <div className="flex items-center gap-2 px-3 py-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                <Leaf />
              </div>
              <span className="text-xl font-black text-gray-800">GreenLink</span>
            </div>

            <nav className="space-y-1">
              {navTabs.map((tab) => {
                const Icon = tab.icon;
                const isActive =
                  activeTab === tab.id ||
                  (activeTab === 'redeemedList' && tab.id === 'offers') ||
                  (activeTab === 'laundry' && tab.id === 'member');

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
                      isActive
                        ? 'text-emerald-600 bg-emerald-50'
                        : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={21} />
                    <span className="font-semibold">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        <main className="flex-1 px-4 pt-5 pb-28 md:py-8 md:px-0">{renderView()}</main>
      </div>

      {modalConfig && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end md:items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-bold text-gray-800">{modalConfig.title}</h3>
              <button
                onClick={() => setModalConfig(null)}
                className="p-1 bg-gray-100 text-gray-500 rounded-full hover:bg-gray-200 transition"
              >
                <X size={18} />
              </button>
            </div>

            <p className="mt-3 text-gray-600 whitespace-pre-line leading-relaxed">
              {modalConfig.content}
            </p>

            <div className="flex gap-3 mt-6">
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
                  if (modalConfig.onConfirm) {
                    modalConfig.onConfirm();
                  }
                  setModalConfig(null);
                }}
                className="flex-1 py-3 rounded-xl font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-100 transition active:scale-95"
              >
                {modalConfig.confirmText || '我知道了'}
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] z-40">
        <div className="max-w-md mx-auto grid grid-cols-4">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive =
              activeTab === tab.id ||
              (activeTab === 'redeemedList' && tab.id === 'offers') ||
              (activeTab === 'laundry' && tab.id === 'member');

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center py-3 gap-1 transition-colors ${
                  isActive ? 'text-emerald-600' : 'text-gray-400'
                }`}
              >
                <Icon size={22} />
                <span className="text-xs font-semibold">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}