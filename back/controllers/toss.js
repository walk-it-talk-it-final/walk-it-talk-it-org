const axios = require("axios");

// TODO: 개발자센터에 로그인해서 내 결제위젯 연동 키 > 시크릿 키를 입력하세요. 시크릿 키는 외부에 공개되면 안돼요.
// @docs https://docs.tosspayments.com/reference/using-api/api-keys

exports.confirmPayment = (req, res) => {
    // create


    // amount: "1000"
    // option: "%EC%98%B5%EC%85%98 1"
    // orderId: "MC4xMTg2MjU3NzI3MDY4"
    // paymentKey: "tgen_202406101045297bO37"
    // paymentType: "NORMAL"
    // quantity: "1"

    // 클라이언트에서 받은 JSON 요청 바디입니다.
    // const { paymentKey, orderId, amount } = req.body;
    // 토스페이먼츠 API는 시크릿 키를 사용자 ID로 사용하고, 비밀번호는 사용하지 않습니다.
    // 비밀번호가 없다는 것을 알리기 위해 시크릿 키 뒤에 콜론을 추가합니다.
    // const widgetSecretKey = "test_sk_6bJXmgo28eBZpeLkz5qE3LAnGKWx";
    // const encryptedSecretKey = "Basic " + Buffer.from(widgetSecretKey + ":").toString("base64");
    // // 결제를 승인하면 결제수단에서 금액이 차감돼요.
    // axios.post("https://api.tosspayments.com/v1/payments/confirm", 
    //     {
    //         orderId: orderId,
    //         amount: amount,
    //         paymentKey: paymentKey,
    //     },
    //     {
    //         Authorization: encryptedSecretKey
    //     },
    // )
    // .then(function (response) {
    //     // 결제 성공 비즈니스 로직을 구현하세요.
    //     console.log(response);
    //     res.status(response.statusCode).json(response.body)
    // })
    // .catch(function (error) {
    //     // 결제 실패 비즈니스 로직을 구현하세요.
    //     res.status(500).json(error.response.data)
    // });

    res.json(req.body)
}