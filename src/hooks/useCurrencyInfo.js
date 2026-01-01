import { useEffect, useState } from "react";

function useCurrencyInfo(base = "USD") {
    const [rates, setRates] = useState({});

    useEffect(() => {
        let mounted = true;
        const url = `https://open.er-api.com/v6/latest/${encodeURIComponent(base)}`;

        (async() => {
            try {
                const res = await fetch(url);
                if (!res.ok) {
                   
                    console.error("Currency API error:", res.status, res.statusText);
                    if (mounted) setRates({});
                    return;
                }
                const data = await res.json();
                if (mounted) setRates((data && data.rates) ? data.rates : {});
            } catch (err) {
                console.error("Failed to fetch currency rates:", err);
                if (mounted) setRates({});
            }
        })();

        return () => { mounted = false; };
    }, [base]);

    return rates; 
}

export default useCurrencyInfo;
