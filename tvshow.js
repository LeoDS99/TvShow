const form = document.querySelector('#searchForm')
const searchResult = document.querySelector('#searchResult')
form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const SearchTerm = form.elements.query.value
    const config = { params: { q: SearchTerm } }
    const res = await axios.get(`http://api.tvmaze.com/search/shows`, config)
    // makeImages(res.data)
    // makeTitle(res.data)
    makeCards(res.data)
    form.elements.query.value = ''
})



const makeCards = (shows) => {
    for (let result of shows) {
        if (result.show.image) {
            const templateSerie = document.querySelector('#template-card').innerHTML
            const replaced = templateSerie
                .replace(/%SERIE_NAME%|%SERIE_IMAGE%/g, (m, key) => {
                    switch (m) {
                        case '%SERIE_NAME%':
                            return result.show.name
                        case '%SERIE_IMAGE%':
                            return result.show.image.medium
                        default: return ''
                    }
                })
            searchResult.innerHTML += replaced
        }
    }
}

/%SERIE_NAME%|%SERIE_IMAGE%/g
// const makeimages = (shows) => {
//     for (let result of shows) {
//         if (result.show.image) {
//             const div = document.createElement('div')
//             div.setAttribute('class', 'boxdiv')
//             const img = document.createElement('IMG')
//             img.src = result.show.image.medium
//             searchResult.append(div)
//             div.append(img)
//         }
//     }
// }

// const makeTitle = (shows) => {
//     for (let result of shows) {
//         if (result.show.name) {
//             const title = result.show.name
//             searchResult.append(title)
//         }
//     }
// }

const clearButton = document.querySelector('#clear')
const deleteImgs = function () {
    const imgs = document.querySelectorAll('img')
    for (let img of imgs) {
        searchResult.innerHTML = ''

    }
}
clearButton.addEventListener('click', deleteImgs)