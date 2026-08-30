const DEVICE_DATA = {
    tv: {
        label: "Tivi",
        lifetimeYear: 6,
        tmrLifetimeWithUse: 1350,
        tmrLifetimeNoUse: 596.2
    },
    refrigerator: {
        label: "Tủ lạnh",
        lifetimeYear: 15,
        tmrLifetimeWithUse: 3629,
        tmrLifetimeNoUse: 1323.1
    },
    air_conditioner: {
        label: "Máy lạnh",
        lifetimeYear: 15,
        tmrLifetimeWithUse: 5982,
        tmrLifetimeNoUse: 2928.8
    },
    cellphone: {
        label: "Điện thoại",
        lifetimeYear: 6,
        tmrLifetimeWithUse: 10.4,
        tmrLifetimeNoUse: 6.17
    },
    laptop: {
        label: "Laptop",
        lifetimeYear: 5,
        tmrLifetimeWithUse: 273,
        tmrLifetimeNoUse: 245.4
    },
    microwave_oven: {
        label: "Lò vi sóng",
        lifetimeYear: 9,
        tmrLifetimeWithUse: 340.1,
        tmrLifetimeNoUse: 325.3
    },
    electric_stove_oven: {
        label: "Bếp điện và lò nướng",
        lifetimeYear: 19,
        tmrLifetimeWithUse: 2164,
        tmrLifetimeNoUse: 512.4
    },
    washing_machine: {
        label: "Máy giặt",
        lifetimeYear: 12.5,
        tmrLifetimeWithUse: 1036,
        tmrLifetimeNoUse: 1036
    }
};

const FOOD_FACTORS = {
    pork: { label: "Thịt heo", unit: "kg/week", mitAbiotic: 8, mitBiotic: 10, mitEarth: 2.8, mitWater: 240, mitAir: 2 },
    beef: { label: "Thịt bò", unit: "kg/week", mitAbiotic: 12, mitBiotic: 31, mitEarth: 3, mitWater: 439, mitAir: 1 },
    chicken: { label: "Thịt gà, vịt", unit: "kg/week", mitAbiotic: 7, mitBiotic: 4.6, mitEarth: 1, mitWater: 228, mitAir: 2 },
    fish: { label: "Cá", unit: "kg/week", mitAbiotic: 3, mitBiotic: 4.7, mitEarth: 0, mitWater: 271, mitAir: 1 },
    milk: { label: "Sữa", unit: "L/week", mitAbiotic: 1, mitBiotic: 3, mitEarth: 0, mitWater: 31, mitAir: 0 },
    vegetable: { label: "Rau, củ", unit: "kg/week", mitAbiotic: 7, mitBiotic: 1, mitEarth: 23, mitWater: 974, mitAir: 4 },
    rice: { label: "Gạo", unit: "kg/month", mitAbiotic: 0, mitBiotic: 1, mitEarth: 2, mitWater: 0, mitAir: 0 }
};

const TRANSPORT_FACTORS = {
    car_ride_hailing: { label: "Ô tô, xe hơi công nghệ", unit: "km/week", mitAbiotic: 2.02, mitBiotic: 0, mitEarth: 0, mitWater: 20, mitAir: 0.19 },
    motorcycle_ride_hailing: { label: "Xe máy, xe máy công nghệ", unit: "km/week", mitAbiotic: 1.54, mitBiotic: 0, mitEarth: 0, mitWater: 0.74, mitAir: 0.27 },
    bus: { label: "Xe buýt", unit: "km/week", mitAbiotic: 0.32, mitBiotic: 0, mitEarth: 0, mitWater: 3.23, mitAir: 0.06 },
    bicycle: { label: "Xe đạp", unit: "km/week", mitAbiotic: 0.38, mitBiotic: 0, mitEarth: 0, mitWater: 12.1, mitAir: 0.02 }
};

const ENERGY_FACTORS = {
    electricity: { label: "Điện", unit: "kWh/month", mitAbiotic: 0.53, mitBiotic: 0, mitEarth: 0, mitWater: 189, mitAir: 0.22 },
    water: { label: "Nước", unit: "m3/month", mitAbiotic: 0.03, mitBiotic: 0, mitEarth: 0, mitWater: 1.33, mitAir: 0.01 },
    gas: { label: "Gas", unit: "bottle/month", mitAbiotic: 0.31, mitBiotic: 0, mitEarth: 0, mitWater: 1, mitAir: 0.8 }
};

const CLOTHING_FACTORS = {
    clothes: { label: "Quần áo", unit: "item/year", tmrFactor: 1264.145 },
    shoes: { label: "Giày dép", unit: "pair/year", tmrFactor: 449.9 }
};

const ENTERTAINMENT_FACTORS = {
    watching_movie_pc_phone: { label: "Xem phim trên máy tính hoặc điện thoại", unit: "hour/week", mitAbiotic: 1, mitBiotic: 0, mitEarth: 0, mitWater: 0, mitAir: 0 },
    playing_game_pc_phone: { label: "Chơi game trên máy tính hoặc điện thoại", unit: "hour/week", mitAbiotic: 1, mitBiotic: 0, mitEarth: 0, mitWater: 0, mitAir: 0 },
    outdoor_activities: { label: "Hoạt động ngoài trời", unit: "hour/week", mitAbiotic: 1.4, mitBiotic: 0, mitEarth: 0, mitWater: 33, mitAir: 0 },
    cinema_music_show: { label: "Đi xem phim, ca nhạc", unit: "hour/week", mitAbiotic: 3.77, mitBiotic: 0, mitEarth: 0, mitWater: 430.91, mitAir: 1.25 },
    watching_tv: { label: "Xem tivi", unit: "hour/week", mitAbiotic: 1, mitBiotic: 0, mitEarth: 0, mitWater: 0, mitAir: 0 }
};

const RESOURCE_BENCHMARKS = {
    sustainableKgPerPersonYear: 8000,
    globalAverageKgPerPersonYear: 13200,
    unit: "kg/người/năm",
    sourceNote: "Mốc 8 tấn/người/năm dùng làm ngưỡng tiêu dùng bền vững tham khảo; mốc 13,2 tấn/người/năm dùng làm trung bình toàn cầu gần đây."
};

// Ngưỡng vận hành ban đầu của ứng dụng, cần hiệu chỉnh khi có đủ dữ liệu thực tế.
const SURVEY_BENCHMARKS = {
    DIEN: { good: 2500, medium: 4500, improve: 6500, unit: "kg/người/năm" },
    TP: { good: 4000, medium: 7000, improve: 10000, unit: "kg/người/năm" },
    MS: { good: 1000, medium: 2200, improve: 3500, unit: "kg/người/năm" }
};

const SUGGESTION_LEVELS = {
    good: {
        label: "Mức tốt",
        badgeClass: "good"
    },
    medium: {
        label: "Mức trung bình",
        badgeClass: "medium"
    },
    improve: {
        label: "Mức cần cải thiện",
        badgeClass: "improve"
    },
    high: {
        label: "Mức cao/cần chú ý",
        badgeClass: "high"
    }
};

const SURVEY_SUGGESTIONS = {
    DIEN: {
        good: {
            title: "Bạn đang sử dụng điện khá tiết kiệm",
            summary: "Kết quả điện/năng lượng đang ở mức tốt. Bạn nên tiếp tục duy trì các thói quen tiết kiệm hiện có.",
            suggestions: [
                "Duy trì thói quen tắt thiết bị khi không sử dụng.",
                "Tiếp tục ưu tiên thiết bị tiết kiệm điện.",
                "Theo dõi hóa đơn điện để giữ mức tiêu thụ ổn định."
            ]
        },
        medium: {
            title: "Mức sử dụng điện còn vài điểm có thể tối ưu",
            summary: "Bạn có thể giảm thêm tác động bằng các thay đổi nhỏ trong sinh hoạt hằng ngày.",
            suggestions: [
                "Hạn chế để thiết bị ở chế độ chờ quá lâu.",
                "Điều chỉnh máy lạnh ở mức hợp lý.",
                "Ưu tiên dùng đèn LED và thiết bị có nhãn tiết kiệm năng lượng."
            ]
        },
        improve: {
            title: "Nên ưu tiên giảm nhóm thiết bị tiêu thụ điện lớn",
            summary: "Kết quả cho thấy điện/năng lượng có thể đang tạo tác động đáng kể.",
            suggestions: [
                "Kiểm tra các thiết bị tiêu thụ điện lớn như máy lạnh, tủ lạnh, máy nước nóng.",
                "Giảm thời gian sử dụng thiết bị không cần thiết.",
                "Xem lại thói quen sử dụng điện vào giờ cao điểm."
            ]
        },
        high: {
            title: "Mức tiêu thụ điện cần được chú ý hơn",
            summary: "Mức tiêu thụ điện có thể đang cao so với nhu cầu cơ bản.",
            suggestions: [
                "Mức tiêu thụ điện có thể đang cao so với nhu cầu cơ bản.",
                "Cần ưu tiên giảm thiết bị công suất lớn và kiểm tra thiết bị cũ.",
                "Nên lập kế hoạch sử dụng điện theo ngày/tuần để kiểm soát tốt hơn."
            ]
        }
    },
    TP: {
        good: {
            title: "Thói quen tiêu dùng thực phẩm của bạn khá hợp lý",
            summary: "Kết quả thực phẩm đang ở mức tốt. Hãy duy trì cách mua và sử dụng thực phẩm có kiểm soát.",
            suggestions: [
                "Tiếp tục ưu tiên thực phẩm địa phương và theo mùa.",
                "Duy trì thói quen mua vừa đủ, hạn chế lãng phí.",
                "Có thể tăng thêm thực phẩm ít tác động môi trường."
            ]
        },
        medium: {
            title: "Có thể giảm thêm lãng phí và thực phẩm tác động cao",
            summary: "Một vài lựa chọn trong ăn uống và mua thực phẩm vẫn còn dư địa cải thiện.",
            suggestions: [
                "Lên kế hoạch bữa ăn để tránh mua dư.",
                "Giảm thực phẩm đóng gói nếu chưa cần thiết.",
                "Ưu tiên nơi mua gần hơn để giảm tác động di chuyển."
            ]
        },
        improve: {
            title: "Nên điều chỉnh nhóm thực phẩm có tác động cao",
            summary: "Kết quả thực phẩm đang cao hơn mức mong muốn, nên ưu tiên các thay đổi dễ làm nhưng có tác động rõ.",
            suggestions: [
                "Giảm tần suất tiêu thụ nhóm thực phẩm có tác động cao.",
                "Tăng tỷ lệ rau củ, thực phẩm theo mùa và nguồn gốc gần.",
                "Hạn chế lãng phí thực phẩm bằng cách bảo quản và sử dụng hợp lý."
            ]
        },
        high: {
            title: "Mức tác động từ thực phẩm cần được chú ý",
            summary: "Thói quen tiêu dùng thực phẩm có thể tạo tác động môi trường cao.",
            suggestions: [
                "Thói quen tiêu dùng thực phẩm có thể tạo tác động môi trường cao.",
                "Nên xem lại tần suất mua, loại thực phẩm và khoảng cách di chuyển.",
                "Ưu tiên thay đổi từ những nhóm tiêu thụ nhiều nhất trước."
            ]
        }
    },
    MS: {
        good: {
            title: "Bạn mua sắm khá có kiểm soát",
            summary: "Kết quả thời trang/mua sắm đang ở mức tốt. Hãy tiếp tục ưu tiên dùng lâu và mua có chủ đích.",
            suggestions: [
                "Tiếp tục mua sắm có kiểm soát.",
                "Ưu tiên dùng lâu, sửa chữa và tái sử dụng.",
                "Duy trì thói quen cân nhắc trước khi mua mới."
            ]
        },
        medium: {
            title: "Có thể mua sắm chậm lại và chọn lọc hơn",
            summary: "Bạn có vài điểm có thể cải thiện bằng cách cân nhắc kỹ trước khi mua mới.",
            suggestions: [
                "Hạn chế mua theo cảm xúc hoặc theo xu hướng ngắn hạn.",
                "Ưu tiên sản phẩm bền, dễ phối và dùng được lâu.",
                "Cân nhắc đồ second-hand nếu phù hợp."
            ]
        },
        improve: {
            title: "Nên giảm mua theo xu hướng ngắn hạn",
            summary: "Mức mua sắm có thể đang làm tăng dấu chân vật chất đáng kể.",
            suggestions: [
                "Giảm số lượng sản phẩm mua mới mỗi tháng.",
                "Tránh mua nhiều sản phẩm chỉ dùng ít lần.",
                "Tái sử dụng, trao đổi hoặc quyên góp đồ cũ thay vì bỏ đi."
            ]
        },
        high: {
            title: "Mức tác động từ mua sắm cần được kiểm soát hơn",
            summary: "Mức mua sắm/thời trang có thể đang cao so với nhu cầu thật.",
            suggestions: [
                "Mức mua sắm/thời trang có thể đang cao so với nhu cầu thật.",
                "Cần giảm mua theo trend và ưu tiên chất lượng hơn số lượng.",
                "Nên đặt giới hạn chi tiêu hoặc số món mua mới mỗi tháng."
            ]
        }
    }
};
