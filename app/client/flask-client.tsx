
export async function get_test_data() {
    try {
        return await fetch("" + process.env.BASE_URL + process.env.NEXT_PUBLIC_BACKEND_URL).then(res => res.text());
    } catch (e) {
        console.log(e);
        return "ya fcked up"
    }
    
}