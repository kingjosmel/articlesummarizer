import Logo from '../assets/logo.svg'

export default function Hero() {
    return (
        <header className='flex flex-col items-center justify-center w-full'>
            <nav className='flex items-center justify-between w-full pt-3 mb-10'>
                <img src={Logo} alt='sums-logo' className='object-contain w-28'/>

                <button
                type='button'
                onClick={() => window.open('https://github.com/kingjosmel/articlesummarizer')}
                className='black_btn'
                >
                    Github
                </button>
            </nav>

            <h1 className='head_text'>
                Summarize Website with <br className='max-md:hidden'/>
                <span className='orange_gradient'>OpenAi GPT-4</span>
            </h1>
            <h2 className='desc'>
                simplify your reading with summize,an open-source Website article summarizer that transforms lengthy articles into clear and concise summaries 
            </h2>
        </header>
    )
}