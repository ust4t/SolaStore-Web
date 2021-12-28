export default async function menuFetch(req, res){
try{
    const response = await fetch("https://api.solastore.com.tr/api/Category/GetAll?lang=tr&sourceProof=ugurturkmenn@gmail.com")
    const data = await response.json()
    res.status(200).json({
        data
    })
} catch(error) {
    res.status(500).json({
        error
    })
}

}