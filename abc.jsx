import React, { useState, useMemo } from "react";
import {
  LayoutGrid,
  ArrowLeftRight,
  CreditCard,
  Settings,
  LogOut,
  Lock,
  Unlock,
  ArrowUpRight,
  ArrowDownLeft,
  Check,
  ChevronRight,
} from "lucide-react";

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

:root {
  --ink: #101A2C;
  --ink-2: #1A2740;
  --paper: #F6F3EA;
  --paper-2: #EEEADD;
  --brass: #C6A15B;
  --brass-dim: #9C7F45;
  --teal: #2F6F62;
  --rust: #B3492F;
  --slate: #6B7280;
  --line: rgba(16,26,44,0.10);
  --line-dark: rgba(246,243,234,0.14);
}

.font-display { font-family: 'Fraunces', serif; }
.font-body { font-family: 'Inter', sans-serif; }
.font-mono { font-family: 'IBM Plex Mono', monospace; }
`;

const initialAccounts = [
  {
    id: "chk",
    name: "Everyday Checking",
    number: "4471",
    balance: 8342.1,
    type: "checking",
  },
  {
    id: "sav",
    name: "Horizon Savings",
    number: "9902",
    balance: 24150.76,
    type: "savings",
  },
];

const seedTransactions = [
  { id: "t1", accountId: "chk", date: "Jul 18", desc: "Ridgeline Coffee Co.", category: "Dining", amount: -6.4 },
  { id: "t2", accountId: "chk", date: "Jul 17", desc: "Payroll — Alta Studio", category: "Income", amount: 3120.0 },
  { id: "t3", accountId: "sav", date: "Jul 16", desc: "Transfer from Checking", category: "Transfer", amount: 500.0 },
  { id: "t4", accountId: "chk", date: "Jul 15", desc: "Transfer to Savings", category: "Transfer", amount: -500.0 },
  { id: "t5", accountId: "chk", date: "Jul 14", desc: "Northside Market", category: "Groceries", amount: -84.22 },
  { id: "t6", accountId: "chk", date: "Jul 12", desc: "Meridian Interest", category: "Interest", amount: 1.14 },
  { id: "t7", accountId: "sav", date: "Jul 10", desc: "Meridian Interest", category: "Interest", amount: 18.62 },
  { id: "t8", accountId: "chk", date: "Jul 09", desc: "Union Electric", category: "Utilities", amount: -112.5 },
];

function formatCurrency(n) {
  const negative = n < 0;
  const v = Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `${negative ? "−" : ""}$${v}`;
}

function NavItem({ icon: Icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-body transition-colors"
      style={{
        color: active ? "var(--ink)" : "rgba(246,243,234,0.65)",
        background: active ? "var(--brass)" : "transparent",
        fontWeight: active ? 600 : 500,
      }}
    >
      <Icon size={17} strokeWidth={1.75} />
      {label}
    </button>
  );
}

function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Enter your email and passcode to continue.");
      return;
    }
    setError("");
    onLogin();
  };

  return (
    <div className="min-h-screen w-full flex font-body" style={{ background: "var(--paper)" }}>
      {/* Left brand panel */}
      <div
        className="hidden md:flex md:w-1/2 flex-col justify-between p-14"
        style={{ background: "var(--ink)" }}
      >
        <div>
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-sm flex items-center justify-center"
              style={{ background: "var(--brass)" }}
            >
              <span className="font-display text-sm" style={{ color: "var(--ink)" }}>M</span>
            </div>
            <span className="font-display text-lg tracking-wide" style={{ color: "var(--paper)" }}>
              Meridian
            </span>
          </div>
        </div>

        <div>
          <p className="font-display text-4xl leading-tight" style={{ color: "var(--paper)" }}>
            Every balance,<br />accounted for.
          </p>
          <p className="mt-5 text-sm max-w-sm" style={{ color: "rgba(246,243,234,0.55)" }}>
            Meridian keeps a plain record of what moves and where — no fine
            print, no surprises on the statement.
          </p>
        </div>

        <div className="flex items-center gap-8 font-mono text-xs" style={{ color: "rgba(246,243,234,0.4)" }}>
          <span>FDIC-STYLE DEMO</span>
          <span>NO REAL FUNDS</span>
          <span>EST. 2024</span>
        </div>
      </div>

      {/* Right login panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <form onSubmit={submit} className="w-full max-w-sm">
          <div className="md:hidden flex items-center gap-2.5 mb-10">
            <div
              className="w-8 h-8 rounded-sm flex items-center justify-center"
              style={{ background: "var(--brass)" }}
            >
              <span className="font-display text-sm" style={{ color: "var(--ink)" }}>M</span>
            </div>
            <span className="font-display text-lg" style={{ color: "var(--ink)" }}>Meridian</span>
          </div>

          <h1 className="font-display text-3xl mb-1" style={{ color: "var(--ink)" }}>
            Sign in
          </h1>
          <p className="text-sm mb-8" style={{ color: "var(--slate)" }}>
            Welcome back. Your ledger is right where you left it.
          </p>

          <label className="block text-xs font-mono mb-1.5 tracking-wide" style={{ color: "var(--slate)" }}>
            EMAIL
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full mb-5 px-3.5 py-2.5 rounded-md text-sm outline-none font-body"
            style={{
              background: "var(--paper-2)",
              border: "1px solid var(--line)",
              color: "var(--ink)",
            }}
          />

          <label className="block text-xs font-mono mb-1.5 tracking-wide" style={{ color: "var(--slate)" }}>
            PASSCODE
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full mb-2 px-3.5 py-2.5 rounded-md text-sm outline-none font-body"
            style={{
              background: "var(--paper-2)",
              border: "1px solid var(--line)",
              color: "var(--ink)",
            }}
          />

          {error && (
            <p className="text-xs mt-2 mb-2" style={{ color: "var(--rust)" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full mt-6 py-2.5 rounded-md text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ background: "var(--ink)", color: "var(--paper)" }}
          >
            Sign in
          </button>

          <p className="text-xs mt-5 text-center" style={{ color: "var(--slate)" }}>
            Any email and passcode will open the demo.
          </p>
        </form>
      </div>
    </div>
  );
}

function AccountCard({ account, selected, onSelect }) {
  const isSavings = account.type === "savings";
  return (
    <button
      onClick={onSelect}
      className="text-left p-5 rounded-lg transition-shadow w-full"
      style={{
        background: "var(--ink)",
        border: selected ? "1px solid var(--brass)" : "1px solid var(--line-dark)",
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-mono tracking-wide" style={{ color: isSavings ? "#7FBFAE" : "var(--brass)" }}>
          {isSavings ? "SAVINGS" : "CHECKING"}
        </span>
        <span className="text-xs font-mono" style={{ color: "rgba(246,243,234,0.4)" }}>
          •••• {account.number}
        </span>
      </div>
      <p className="text-sm mb-1.5" style={{ color: "rgba(246,243,234,0.6)" }}>{account.name}</p>
      <p className="font-display text-3xl" style={{ color: "var(--paper)" }}>
        {formatCurrency(account.balance)}
      </p>
    </button>
  );
}

function LedgerRow({ tx }) {
  const positive = tx.amount >= 0;
  return (
    <div
      className="flex items-center justify-between py-3.5"
      style={{ borderBottom: "1px solid var(--line)" }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
          style={{ background: positive ? "rgba(47,111,98,0.12)" : "rgba(179,73,47,0.10)" }}
        >
          {positive ? (
            <ArrowDownLeft size={14} style={{ color: "var(--teal)" }} strokeWidth={2} />
          ) : (
            <ArrowUpRight size={14} style={{ color: "var(--rust)" }} strokeWidth={2} />
          )}
        </div>
        <div>
          <p className="text-sm font-body" style={{ color: "var(--ink)" }}>{tx.desc}</p>
          <p className="text-xs font-mono mt-0.5" style={{ color: "var(--slate)" }}>
            {tx.date} · {tx.category}
          </p>
        </div>
      </div>
      <span
        className="font-mono text-sm"
        style={{ color: positive ? "var(--teal)" : "var(--ink)" }}
      >
        {positive ? "+" : ""}
        {formatCurrency(tx.amount)}
      </span>
    </div>
  );
}

function OverviewView({ accounts, transactions, selectedAccountId, setSelectedAccountId }) {
  const filtered = useMemo(
    () =>
      selectedAccountId === "all"
        ? transactions
        : transactions.filter((t) => t.accountId === selectedAccountId),
    [transactions, selectedAccountId]
  );

  const totalBalance = accounts.reduce((s, a) => s + a.balance, 0);

  return (
    <div>
      <div className="mb-8">
        <p className="text-xs font-mono tracking-wide mb-1" style={{ color: "var(--slate)" }}>
          TOTAL ACROSS ACCOUNTS
        </p>
        <p className="font-display text-5xl" style={{ color: "var(--ink)" }}>
          {formatCurrency(totalBalance)}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {accounts.map((a) => (
          <AccountCard
            key={a.id}
            account={a}
            selected={selectedAccountId === a.id}
            onSelect={() => setSelectedAccountId(selectedAccountId === a.id ? "all" : a.id)}
          />
        ))}
      </div>

      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display text-xl" style={{ color: "var(--ink)" }}>
          Statement ledger
        </h2>
        {selectedAccountId !== "all" && (
          <button
            onClick={() => setSelectedAccountId("all")}
            className="text-xs font-mono underline"
            style={{ color: "var(--slate)" }}
          >
            clear filter
          </button>
        )}
      </div>
      <div
        className="rounded-lg px-5"
        style={{ background: "var(--paper)", border: "1px solid var(--line)" }}
      >
        {filtered.length === 0 ? (
          <p className="text-sm py-8 text-center" style={{ color: "var(--slate)" }}>
            No entries for this account yet.
          </p>
        ) : (
          filtered.map((tx) => <LedgerRow key={tx.id} tx={tx} />)
        )}
      </div>
    </div>
  );
}

function CardsView({ cardFrozen, setCardFrozen }) {
  return (
    <div>
      <h2 className="font-display text-2xl mb-1" style={{ color: "var(--ink)" }}>
        Cards
      </h2>
      <p className="text-sm mb-8" style={{ color: "var(--slate)" }}>
        One card, tied straight to Everyday Checking.
      </p>

      <div className="flex flex-col sm:flex-row gap-8 items-start">
        <div
          className="relative w-full sm:w-80 h-48 rounded-xl p-6 flex flex-col justify-between shrink-0"
          style={{
            background: "linear-gradient(135deg, var(--ink) 0%, #1F2E4A 100%)",
            border: "1px solid var(--line-dark)",
            opacity: cardFrozen ? 0.55 : 1,
            transition: "opacity 0.2s",
          }}
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-base" style={{ color: "var(--paper)" }}>
              Meridian
            </span>
            <div className="w-8 h-6 rounded-sm" style={{ background: "var(--brass)" }} />
          </div>
          <div>
            <p className="font-mono text-lg tracking-widest mb-3" style={{ color: "rgba(246,243,234,0.85)" }}>
              •••• •••• •••• 4471
            </p>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs" style={{ color: "rgba(246,243,234,0.55)" }}>
                A. MORROW
              </span>
              <span className="font-mono text-xs" style={{ color: "rgba(246,243,234,0.55)" }}>
                09/29
              </span>
            </div>
          </div>
          {cardFrozen && (
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="font-mono text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5"
                style={{ background: "var(--ink)", color: "var(--paper)", border: "1px solid var(--brass)" }}
              >
                <Lock size={11} /> FROZEN
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 w-full">
          <div
            className="flex items-center justify-between p-4 rounded-lg mb-3"
            style={{ background: "var(--paper)", border: "1px solid var(--line)" }}
          >
            <div>
              <p className="text-sm font-body" style={{ color: "var(--ink)" }}>
                {cardFrozen ? "Card is frozen" : "Card is active"}
              </p>
              <p className="text-xs" style={{ color: "var(--slate)" }}>
                {cardFrozen
                  ? "New purchases and withdrawals are blocked."
                  : "Purchases and withdrawals are enabled."}
              </p>
            </div>
            <button
              onClick={() => setCardFrozen((f) => !f)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs font-semibold shrink-0"
              style={{
                background: cardFrozen ? "var(--teal)" : "var(--rust)",
                color: "var(--paper)",
              }}
            >
              {cardFrozen ? <Unlock size={13} /> : <Lock size={13} />}
              {cardFrozen ? "Unfreeze card" : "Freeze card"}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              ["Daily purchase limit", "$5,000"],
              ["ATM withdrawal limit", "$800"],
              ["Contactless", "Enabled"],
              ["International use", "Enabled"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="p-3.5 rounded-lg"
                style={{ background: "var(--paper)", border: "1px solid var(--line)" }}
              >
                <p className="text-xs mb-1" style={{ color: "var(--slate)" }}>{label}</p>
                <p className="text-sm font-mono" style={{ color: "var(--ink)" }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TransfersView({ accounts, onTransfer }) {
  const [fromId, setFromId] = useState(accounts[0].id);
  const [toId, setToId] = useState(accounts[1].id);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const fromAccount = accounts.find((a) => a.id === fromId);

  const submit = (e) => {
    e.preventDefault();
    const value = parseFloat(amount);
    setSuccess(false);

    if (fromId === toId) {
      setError("Choose two different accounts.");
      return;
    }
    if (!value || value <= 0) {
      setError("Enter an amount greater than $0.");
      return;
    }
    if (value > fromAccount.balance) {
      setError("That's more than the account holds.");
      return;
    }

    setError("");
    onTransfer({ fromId, toId, amount: value, note });
    setSuccess(true);
    setAmount("");
    setNote("");
  };

  return (
    <div className="max-w-md">
      <h2 className="font-display text-2xl mb-1" style={{ color: "var(--ink)" }}>
        Move money
      </h2>
      <p className="text-sm mb-8" style={{ color: "var(--slate)" }}>
        Transfers between your own accounts post immediately.
      </p>

      <form
        onSubmit={submit}
        className="p-6 rounded-lg"
        style={{ background: "var(--paper)", border: "1px solid var(--line)" }}
      >
        <label className="block text-xs font-mono mb-1.5" style={{ color: "var(--slate)" }}>
          FROM
        </label>
        <select
          value={fromId}
          onChange={(e) => setFromId(e.target.value)}
          className="w-full mb-4 px-3.5 py-2.5 rounded-md text-sm outline-none font-body"
          style={{ background: "var(--paper-2)", border: "1px solid var(--line)", color: "var(--ink)" }}
        >
          {accounts.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name} — {formatCurrency(a.balance)}
            </option>
          ))}
        </select>

        <label className="block text-xs font-mono mb-1.5" style={{ color: "var(--slate)" }}>
          TO
        </label>
        <select
          value={toId}
          onChange={(e) => setToId(e.target.value)}
          className="w-full mb-4 px-3.5 py-2.5 rounded-md text-sm outline-none font-body"
          style={{ background: "var(--paper-2)", border: "1px solid var(--line)", color: "var(--ink)" }}
        >
          {accounts.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name} — {formatCurrency(a.balance)}
            </option>
          ))}
        </select>

        <label className="block text-xs font-mono mb-1.5" style={{ color: "var(--slate)" }}>
          AMOUNT
        </label>
        <div className="relative mb-4">
          <span
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-mono"
            style={{ color: "var(--slate)" }}
          >
            $
          </span>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full pl-7 pr-3.5 py-2.5 rounded-md text-sm outline-none font-mono"
            style={{ background: "var(--paper-2)", border: "1px solid var(--line)", color: "var(--ink)" }}
          />
        </div>

        <label className="block text-xs font-mono mb-1.5" style={{ color: "var(--slate)" }}>
          NOTE (OPTIONAL)
        </label>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="What's this for?"
          className="w-full mb-5 px-3.5 py-2.5 rounded-md text-sm outline-none font-body"
          style={{ background: "var(--paper-2)", border: "1px solid var(--line)", color: "var(--ink)" }}
        />

        {error && (
          <p className="text-xs mb-3" style={{ color: "var(--rust)" }}>
            {error}
          </p>
        )}
        {success && (
          <p className="text-xs mb-3 flex items-center gap-1.5" style={{ color: "var(--teal)" }}>
            <Check size={13} /> Transfer complete.
          </p>
        )}

        <button
          type="submit"
          className="w-full py-2.5 rounded-md text-sm font-semibold flex items-center justify-center gap-1.5"
          style={{ background: "var(--ink)", color: "var(--paper)" }}
        >
          Send transfer <ChevronRight size={15} />
        </button>
      </form>
    </div>
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [view, setView] = useState("overview");
  const [accounts, setAccounts] = useState(initialAccounts);
  const [transactions, setTransactions] = useState(seedTransactions);
  const [selectedAccountId, setSelectedAccountId] = useState("all");
  const [cardFrozen, setCardFrozen] = useState(false);

  const handleTransfer = ({ fromId, toId, amount, note }) => {
    setAccounts((prev) =>
      prev.map((a) => {
        if (a.id === fromId) return { ...a, balance: a.balance - amount };
        if (a.id === toId) return { ...a, balance: a.balance + amount };
        return a;
      })
    );
    const toName = accounts.find((a) => a.id === toId)?.name || "account";
    const fromName = accounts.find((a) => a.id === fromId)?.name || "account";
    const today = "Jul 20";
    setTransactions((prev) => [
      { id: `t-${Date.now()}-out`, accountId: fromId, date: today, desc: note || `Transfer to ${toName}`, category: "Transfer", amount: -amount },
      { id: `t-${Date.now()}-in`, accountId: toId, date: today, desc: note || `Transfer from ${fromName}`, category: "Transfer", amount: amount },
      ...prev,
    ]);
  };

  if (!loggedIn) {
    return (
      <>
        <style>{FONTS}</style>
        <LoginScreen onLogin={() => setLoggedIn(true)} />
      </>
    );
  }

  const navItems = [
    { key: "overview", label: "Overview", icon: LayoutGrid },
    { key: "transfers", label: "Transfers", icon: ArrowLeftRight },
    { key: "cards", label: "Cards", icon: CreditCard },
    { key: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <>
      <style>{FONTS}</style>
      <div className="min-h-screen w-full flex font-body" style={{ background: "var(--paper)" }}>
        {/* Sidebar */}
        <div
          className="hidden md:flex md:w-56 flex-col justify-between p-5 shrink-0"
          style={{ background: "var(--ink)" }}
        >
          <div>
            <div className="flex items-center gap-2.5 px-2 mb-8">
              <div className="w-7 h-7 rounded-sm flex items-center justify-center" style={{ background: "var(--brass)" }}>
                <span className="font-display text-xs" style={{ color: "var(--ink)" }}>M</span>
              </div>
              <span className="font-display text-base" style={{ color: "var(--paper)" }}>Meridian</span>
            </div>
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavItem
                  key={item.key}
                  icon={item.icon}
                  label={item.label}
                  active={view === item.key}
                  onClick={() => item.key !== "settings" && setView(item.key)}
                />
              ))}
            </div>
          </div>
          <button
            onClick={() => setLoggedIn(false)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-body"
            style={{ color: "rgba(246,243,234,0.5)" }}
          >
            <LogOut size={17} strokeWidth={1.75} />
            Sign out
          </button>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Top bar */}
          <div
            className="flex items-center justify-between px-6 sm:px-10 py-5"
            style={{ borderBottom: "1px solid var(--line)" }}
          >
            <div>
              <p className="text-xs font-mono" style={{ color: "var(--slate)" }}>SUNDAY, JULY 20</p>
              <p className="font-display text-xl" style={{ color: "var(--ink)" }}>Good afternoon, Avery</p>
            </div>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs"
              style={{ background: "var(--paper-2)", color: "var(--ink)", border: "1px solid var(--line)" }}
            >
              AM
            </div>
          </div>

          {/* Mobile nav */}
          <div
            className="md:hidden flex items-center gap-1 px-4 py-3 overflow-x-auto"
            style={{ borderBottom: "1px solid var(--line)" }}
          >
            {navItems.filter((i) => i.key !== "settings").map((item) => (
              <button
                key={item.key}
                onClick={() => setView(item.key)}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap"
                style={{
                  background: view === item.key ? "var(--ink)" : "transparent",
                  color: view === item.key ? "var(--paper)" : "var(--slate)",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="px-6 sm:px-10 py-8">
            {view === "overview" && (
              <OverviewView
                accounts={accounts}
                transactions={transactions}
                selectedAccountId={selectedAccountId}
                setSelectedAccountId={setSelectedAccountId}
              />
            )}
            {view === "cards" && <CardsView cardFrozen={cardFrozen} setCardFrozen={setCardFrozen} />}
            {view === "transfers" && <TransfersView accounts={accounts} onTransfer={handleTransfer} />}
          </div>
        </div>
      </div>
    </>
  );
}
