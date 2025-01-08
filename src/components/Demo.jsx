import { useState, useEffect } from "react";
import copy from '../assets/copy.svg';
import link from '../assets/link.svg';
import loader from '../assets/loader.svg';
import tick from '../assets/tick.svg';
import { useLazyGetSummaryQuery } from "../services/article";

export default function Demo() {
    const [article, setArticle] = useState({
        url: '',
        summary: '',
    })

    const [allArticles, setAllArticles] = useState([]);
    const [copied, setCopied] = useState('')

    const [getSummary, {error, isFetching}] = useLazyGetSummaryQuery();

    useEffect(() => {
        const articlesFromLocalstorage = JSON.parse(
            localStorage.getItem('articles')
        )

        if(articlesFromLocalstorage){
            setAllArticles(articlesFromLocalstorage)
        }
    },[])

    const HandleSubmit = async(e) => {
        e.preventDefault();
        const {data} = await getSummary({articleUrl: article.url});

        if(data?.summary){
            const newArticle = {...article, summary: data.summary};
           const updatedArticles = [newArticle, ...allArticles]
           setAllArticles(updatedArticles)

            setArticle(newArticle);
            localStorage.setItem('articles', JSON.stringify(updatedArticles))
        }
    }

    const handleCopy = (copyurl) => {
        setCopied(copyurl);
        navigator.clipboard.writeText(copyurl);
        setTimeout(() => setCopied(false), 3000)
    }
    return (
        <section className="mt-16 w-full max-w-xl">
            {/* search */}
            <div className="flex flex-col w-full gap-2">

                <form className="relative flex justify-center items-center"
                onSubmit={HandleSubmit}
                >
                    <img 
                    src={link}
                    alt='link icon'
                    className="absolute left-0 my-2 ml-3 w-5"
                    />

                    <input 
                    type="url"
                    placeholder="Enter a url"
                    value={article.url}
                    onChange={(e) => setArticle({
                        ...article, url: e.target.value
                    })}
                    required
                    className='url_input peer'
                    />

                    <button 
                    type='submit'
                    className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
                    >
                        ↵
                    </button>

                </form>
                {/* browse url history */}

                    <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
                        {allArticles.map((item, index) => (
                            <div 
                            key={`link-${index}`}
                            onClick={() => setArticle(item)}
                            className="link_card"
                            >
                                <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                                    <img src={copied === item.url ? tick : copy} alt='copy-icon' className="w-[40%] h-[40%] object-contain"/>
                                </div>
                                <p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
                                    {item.url}
                                </p>
                            </div>
                        ))}
                    </div>
            </div>
                        {/* article summary */}
            <div className="my-10 max-w-full flex justify-center items-center">
                {isFetching ? (
                    <img src={loader} alt='loader-image' className="w-20 h-20 object-contain"/>
                ): error ? (
                    <p className="font-inter font-bold text-black text-center">
                        Well that wasn't surposed to happen... <br />
                        <span className="font-satoshi font-normal text-gray-700">
                            {error?.data?.error}
                        </span>
                    </p>
                ): (
                    article.summary && (
                        <div className='flex flex-col gap-3'>
                            <h2 className="font-satoshi font-bold text-gray-600 text-xl">
                                article <span className="blue_gradient">summary</span>
                            </h2>
                            <div className="summary_box">
                                <p className="font-inter font-medium text-gray-700 text-sm">{article.summary}</p>
                            </div>

                        </div>
                    )
                )}
            </div>
        </section>
    )
}