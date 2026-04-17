

console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
console.log(process.env.VERCEL_URL);
console.log(process.env.BASE_URL);

export async function get_test_data() {
    
    console.log("" + process.env.BASE_URL + process.env.NEXT_PUBLIC_BACKEND_URL)
    try {
        return await fetch("" + process.env.BASE_URL + process.env.NEXT_PUBLIC_BACKEND_URL).then(res => res.text());
    } catch (e) {
        console.log(e);
        return "ya fcked up"
    }
    
}