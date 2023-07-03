async function getRepo(search){
    let res = await axios.get(`https://api.github.com/search/repositories?q=<${search}>`)
    for(let i = 0; i < 5; i++){
        renderRepo(res.data.items[i])
    }
    
}

function renderRepo(repos){
    // console.log(repos)
    console.log(repos)
    let gitRepoSpace = document.querySelector('.gitRepoSpace')

    //repo row
    const gitRepoRow = document.createElement('div')
    gitRepoRow.setAttribute('class', 'row d-flex justify-content-center mt-4')

    // repo column
    const gitRepoColumn = document.createElement('div')
    gitRepoColumn.setAttribute('class', 'col-11 col-md-6 gitRepoColumn rounded row py-3')

    // repo image container
    const gitIMGContainer = document.createElement('div')
    gitIMGContainer.setAttribute('class', 'col-2')

    // repo information container
    const gitInfoContainer = document.createElement('div')
    gitInfoContainer.setAttribute('class', 'col-10')
    
    // creator profile picture
    const gitCreatorAvatar = document.createElement('img')
    gitCreatorAvatar.setAttribute('class', 'rounded-pill img-fluid')
    gitCreatorAvatar.src = repos.owner.avatar_url

    // creator name container
    const gitCreatorNameContainer = document.createElement('div')
    gitCreatorNameContainer.setAttribute('class', 'd-flex justify-content-between')

    // creator name
    const gitCreatorName = document.createElement('div')
    gitCreatorName.setAttribute('class', 'h4 text-light')
    gitCreatorName.innerText = repos.full_name

    // repo date created
    const gitDateCreated = document.createElement('span')
    gitDateCreated.setAttribute('class', 'text-light')
    const dateDraft = repos.created_at
    let dateArr = dateDraft.split('')
    for(let i = 0; i <= 10; i++){
        dateArr.pop()
    }
    let dateFinal = dateArr.join('')
    gitDateCreated.innerText = dateFinal
    
    // repo link
    const gitLink = document.createElement('a')
    gitLink.setAttribute('href', `${repos.html_url}`)
    gitLink.setAttribute('target', "_blank")
    gitLink.setAttribute('class', '')
    gitLink.innerText = 'View on Github'

    // repo description
    const gitDesc = document.createElement("p")
    gitDesc.setAttribute('class', 'text-light mt-2')
    gitDesc.innerText = repos.description

    // github stats 
    const gitStatsContainer = document.createElement('div')
    gitStatsContainer.setAttribute('class', 'text-light rounded gitStats container py-4')
    const gitStatsRow = document.createElement('div')
    gitStatsRow.setAttribute('class', 'row d-flex justify-content-center')

    const starContainer = document.createElement('div')
    starContainer.setAttribute('class', 'col-3 text-secondary')
    starContainer.innerText = 'Stars'
    const star = document.createElement('div')
    star.setAttribute('class', 'fw-bold text-light')
    star.innerText = repos.stargazers_count

    const forksContainer = document.createElement('div')
    forksContainer.setAttribute('class', 'col-3 text-secondary')
    forksContainer.innerText = 'Forks'
    const forks = document.createElement('div')
    forks.setAttribute('class', 'fw-bold text-light')
    forks.innerText = repos.forks

    const watchersContainer = document.createElement('div')
    watchersContainer.setAttribute('class', 'col-3 text-secondary')
    watchersContainer.innerText = 'Watchers'
    const watchers = document.createElement('div')
    watchers.setAttribute('class', 'fw-bold text-light')
    watchers.innerText = repos.watchers

    // Extra Info
    const extraInfoContainer = document.createElement('div')
    extraInfoContainer.setAttribute('class', 'row text-light')

    // code language
    const codeUsedContainer = document.createElement('div')
    codeUsedContainer.setAttribute('class', 'col-12 col-md-3 my-2')
    codeUsedContainer.innerHTML = `&lt;/&gt; ${repos.language}` 

    // page
    const twitterPageContainer = document.createElement('div')
    twitterPageContainer.setAttribute('class', 'col-12 col-md-9 my-2')

    const twitterLogo = document.createElement('img')
    twitterLogo.setAttribute('width', '20px')
    twitterLogo.setAttribute('src', 'img/twitter.png')
    let twitterAvailability = ' Not Available'

    // visibility
    const visibility = document.createElement('div')
    visibility.setAttribute('class', 'col-12 col-md-3 my-2')
    const visibilityLogo = document.createElement('img')
    visibilityLogo.setAttribute('width', '20px')
    visibilityLogo.setAttribute('src', 'img/view.png')
    let visibilityStr = ` ${repos.visibility}`

    // organization
    const org = document.createElement('div')
    org.setAttribute('class', 'col-12 col-md-9 my-2')
    const orgLogo = document.createElement('img')
    orgLogo.setAttribute('width', '20px')
    orgLogo.setAttribute('src', 'img/building.png')
    let orgStr = ` ${repos.owner.organizations_url}`


    // ADDING TO PAGE
    gitRepoSpace.append(gitRepoRow)
    gitRepoRow.append(gitRepoColumn)
    gitRepoColumn.append(gitIMGContainer)
    gitIMGContainer.append(gitCreatorAvatar)
    gitRepoColumn.append(gitInfoContainer)

    gitInfoContainer.append(gitCreatorNameContainer)
    gitCreatorNameContainer.append(gitCreatorName)
    gitCreatorNameContainer.append(gitDateCreated)
    gitInfoContainer.append(gitLink)
    gitInfoContainer.append(gitDesc)
    gitInfoContainer.append(gitStatsContainer)

    gitStatsContainer.append(gitStatsRow)
    gitStatsRow.append(starContainer)
    starContainer.append(star)
    gitStatsRow.append(forksContainer)
    forksContainer.append(forks)
    gitStatsRow.append(watchersContainer)
    watchersContainer.append(watchers)

    gitInfoContainer.append(extraInfoContainer)
    extraInfoContainer.append(codeUsedContainer)
    extraInfoContainer.append(twitterPageContainer)
    twitterPageContainer.append(twitterLogo)
    twitterPageContainer.append(twitterAvailability)

    extraInfoContainer.append(visibility)
    visibility.append(visibilityLogo)
    visibility.append(visibilityStr)

    extraInfoContainer.append(org)
    org.append(orgLogo)
    org.append(orgStr)
}

const button = document.querySelector('button')
const input = document.querySelector('input')

button.addEventListener('click', function(){
    $('.gitRepoSpace').empty()
    let search = input.value
    getRepo(search)
})