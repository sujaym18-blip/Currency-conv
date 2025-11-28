import { useState } from 'react'
import { InputBox } from './components/Index'
import useCurrencyInfo from './hooks/useCurrencyInfo'
import './index.css'
import githubIcon from './assets/github-sign.png'
import instagramIcon from './assets/instagram.png'
import linkedinIcon from './assets/linkedin.png'


function App() {
  const [amount, setAmount] = useState("1")
  const [from, setFrom] = useState("USD")
  const [to, setTo] = useState("INR")
  const [convertedAmount, setConvertedAmount] = useState("")

  const rates = useCurrencyInfo(from)
  const options = Object.keys(rates || {})

  const swap = () => {
    const prevFrom = from
    const prevTo = to
    const parsedConverted = Number(convertedAmount)
    const safeConverted = isFinite(parsedConverted) ? String(parsedConverted) : ""
    setFrom(prevTo)
    setTo(prevFrom)
    setAmount(safeConverted || amount)
    setConvertedAmount("")
  }

  const convert = () => {
    const a = Number(amount)
    const rate = Number(rates[to])
    if (!isFinite(a) || !isFinite(rate)) {
      setConvertedAmount("")
      return
    }
    const result = a * rate
    setConvertedAmount(result.toFixed(2))
  }

  return (
    <div className="w-full h-screen flex justify-center items-center relative overflow-hidden">

      <div className="gradient-bg absolute inset-0 z-0"></div>

      <div className="absolute top-10 w-full text-center z-0">
        <h1 className="text-white/30 text-6xl font-bold tracking-widest select-none">
          CURRENCY CONVERTER
        </h1>
      </div>

      <div className="particles z-0" aria-hidden>
        <div className="p1" />
        <div className="p2" />
        <div className="p3" />
        <div className="p4" />
        <div className="p5" />
      </div>

      <div
        className="
          w-full max-w-md mx-auto 
          p-6 
          rounded-2xl 
          bg-white/20 
          backdrop-blur-xl 
          border border-white/30 
          shadow-xl 
          ring-1 ring-black/5 
          z-10
        "
      >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            convert()
          }}
        >
          <div className="w-full mb-1">
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency) => {
                setFrom(currency)
                setConvertedAmount("")
              }}
              selectCurrency={from}
              onAmountChange={(amt) => setAmount(amt)}
            />
          </div>

          <div className="relative w-full h-0.5">
            <button
              type="button"
              className="
                absolute left-1/2 -translate-x-1/2 -translate-y-1/2
                bg-blue-600 hover:bg-blue-700 
                text-white px-3 py-1 rounded-full shadow-md 
                transition-all
              "
              onClick={swap}
            >
              ⇅
            </button>
          </div>

          <div className="w-full mt-1 mb-4">
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOptions={options}
              onCurrencyChange={(currency) => {
                setTo(currency)
                setConvertedAmount("")
              }}
              selectCurrency={to}
              amountDisable
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold shadow-md transition"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
        </form>
      </div>

      {/* SOCIAL FOOTER */}
      <div className="absolute bottom-4 w-full text-center z-20">
        <div className="flex justify-center gap-6 mb-2">

          <a
            href="https://github.com/dashboardr"
            target="_blank"
            className="text-white/60 hover:text-white transition text-xl"
            
          >
                    <img 
            src={githubIcon} 
            alt="GitHub" 
            className="w-6 h-6 md:w-7 md:h-7 opacity-70 hover:opacity-100 transition" 
            />

          </a>

          <a
            href="https://www.linkedin.com/feed/"
            target="_blank"
            className="text-white/60 hover:text-white transition text-xl"
          >     <img 
            src={linkedinIcon} 
            alt="GitHub" 
            className="w-6 h-6 md:w-7 md:h-7 opacity-70 hover:opacity-100 transition" 
            />

          </a>

          <a
            href="https://www.instagram.com/sujaymishra_?igsh=MzZpMGhhMmJtcm1r"
            target="_blank"
            className="text-white/60 hover:text-white transition text-xl"
          >

            <img 
            src={instagramIcon} 
            alt="GitHub" 
            className="w-6 h-6 md:w-7 md:h-7 opacity-70 hover:opacity-100 transition" 
            />
          </a>

        </div>

        <p className="text-white/50 text-sm">
          © 2025 Sujay. All Rights Reserved.
        </p>
      </div>

    </div>
  )
}

export default App
