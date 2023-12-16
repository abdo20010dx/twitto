import Script from 'next/script';

export default function Adsense() {
    return (<>
        <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5128167768665697"
            crossOrigin="anonymous"
            strategy="lazyOnload"
        />
    </>);
}
