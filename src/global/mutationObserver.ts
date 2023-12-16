


// export async function scrapperObserver(url: string) {
//     const callback = (mutationList: any, observe: any) => {
//         console.log(mutationList);

//     }
//     const html = await (await fetch(url)).text()
//     console.log(html);

//     const oberver = new MutationObserver(callback)
//     const targetNode: Node = new DOMParser().parseFromString(html, "text/html")
//     oberver.observe(targetNode, { childList: true, subtree: true, attributes: true, characterData: true })

// }