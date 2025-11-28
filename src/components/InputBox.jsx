import React, { useId } from "react";
import ReactCountryFlag from "react-country-flag";

function Flag({ currency }) {
  const map = {
    USD: "US",
    EUR: "EU",
    GBP: "GB",
    INR: "IN",
    JPY: "JP",
    AUD: "AU",
    CAD: "CA",
    CHF: "CH",
    CNY: "CN",
    HKD: "HK",
    SGD: "SG",
    KRW: "KR",
    RUB: "RU",
    ZAR: "ZA",
    AED: "AE",
    NZD: "NZ",
    BRL: "BR",
    TRY: "TR",
    SEK: "SE",
    NOK: "NO",
    DKK: "DK",
    PLN: "PL",
    ILS: "IL",
    PHP: "PH",
    THB: "TH",
    VND: "VN",
    MYR: "MY",
    IDR: "ID",
    BDT: "BD",
    PKR: "PK",
    ARS: "AR",
    CLP: "CL",
    COP: "CO",
    EGP: "EG",
    NGN: "NG",
    KES: "KE",
    MAD: "MA",
    TWD: "TW",
    SAR: "SA",
    RON: "RO",
    HUF: "HU",
    CZK: "CZ",
    ISK: "IS",
    LKR: "LK",
    OMR: "OM",
    QAR: "QA",
    KWD: "KW",
    JOD: "JO",
    DZD: "DZ",
    MVR: "MV",
    AMD: "AM",
    GEL: "GE",
    KZT: "KZ",
    UAH: "UA",
    TND: "TN",
    BGN: "BG",
    HRK: "HR",
    RSD: "RS",
    BOB: "BO",
    PEN: "PE",
    UYU: "UY",
    MOP: "MO",
    XOF: "SN",
    XAF: "CM"
  };

  let country = map[currency] || currency.slice(0, 2).toUpperCase();
  if (country.length !== 2) country = "US";

  return (
    <ReactCountryFlag
      countryCode={country}
      svg
      style={{ width: "1.35em", height: "1.35em", borderRadius: 4 }}
    />
  );
}

export default function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "USD",
  amountDisable = false,
  currencyDisable = false,
  className = ""
}) {
  const amountInputId = useId();

  return (
    <div
      className={`w-full p-3 rounded-xl flex items-center gap-3 ${className}`}
      style={{ background: "rgba(255,255,255,0.06)" }}
    >
      <div className="flex-1">
        <label htmlFor={amountInputId} className="block text-sm text-white/80 mb-1">
          {label}
        </label>

        <div className="bg-white/10 border border-white/10 rounded-lg px-3 py-2 flex items-center gap-3 shadow-sm focus-within:ring-1 focus-within:ring-white/20">
          <input
            id={amountInputId}
            className="w-full bg-transparent outline-none text-white placeholder-white/50 text-lg"
            type="number"
            inputMode="decimal"
            placeholder="Amount"
            disabled={amountDisable}
            value={amount ?? ""}
            onChange={(e) => onAmountChange && onAmountChange(e.target.value)}
          />
        </div>
      </div>

      <div className="w-36 flex flex-col items-end">
        <p className="text-sm text-white/80 mb-1">Currency</p>

        <div className="flex items-center gap-2 bg-white/8 border border-white/10 rounded-lg px-2 py-1 shadow-sm">
          <Flag currency={selectCurrency} />

          {currencyOptions.length === 0 ? (
            <div className="flex items-center gap-2 pl-1 pr-2">
              <svg
                className="animate-spin h-5 w-5 text-white/70"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
            </div>
          ) : (
            <select
              className="bg-transparent outline-none font-medium cursor-pointer text-white"
              value={selectCurrency}
              onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
              disabled={currencyDisable}
              style={{ color: "white" }}
            >
              {currencyOptions.map((cur) => (
                <option key={cur} value={cur} className="text-black">
                  {cur}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>
  );
}
