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

    const [getSummary, {error, isFetching}] = useLazyGetSummaryQuery();

    const HandleSubmit = async(e) => {
        e.preventDefault()
        const {data} = await getSummary({articleUrls: article.url});
        
        if(data?.summary){
            const newArticle = {...article, summary: data.summary};

            setArticle(newArticle)
            console.log(newArticle)
        }
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



            </div>
        </section>
    )
}