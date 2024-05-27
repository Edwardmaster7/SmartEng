export function ButtonComponent({content, imgSrc}) {
    return (
        <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
            {imgSrc && <img className="h-10 w-10 rounded-2xl" src={imgSrc} alt="Menu" />}
            {content}
        </button>
    )
}