import summaryApi from "../common";
import {toast} from "react-toastify"

const addToCart =async(e,id) =>{
    e?.stopPropagation()
    e?.preventDefault();

    const response = await fetch(summaryApi.userCart.url,{
        method: summaryApi.userCart.method,
        credentials: "include",
        headers:{
            "Content-Type" : "application/json"
        },

        body : JSON.stringify(
            {productId : id}
        )
    })

    const responseData = await response.json()

    if(responseData.success){
        toast.success(responseData.message)
    }

    if(responseData.error){
        toast.error(responseData.message)
    }

    return responseData;
}

export default addToCart
