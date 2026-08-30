// Du lieu hanh chinh sau sap nhap 2025.
// Nguon: /Users/nguyentrongnhan/data/danhsachxaphuong.xlsx
// Cau truc chi co 2 cap: Tinh/Thanh pho -> Xa/Phuong.
const LOCATION_DATA_2025 = [
    {
        "maThanhPho": "32",
        "thanhPho": "Tỉnh An Giang",
        "xaPhuong": [
            {
                "maXa": "80501003",
                "tenXa": "Phường Bình Đức"
            },
            {
                "maXa": "80513032",
                "tenXa": "Phường Chi Lăng"
            },
            {
                "maXa": "80503005",
                "tenXa": "Phường Châu Đốc"
            },
            {
                "maXa": "81325098",
                "tenXa": "Phường Hà Tiên"
            },
            {
                "maXa": "80507016",
                "tenXa": "Phường Long Phú"
            },
            {
                "maXa": "80501002",
                "tenXa": "Phường Long Xuyên"
            },
            {
                "maXa": "80501004",
                "tenXa": "Phường Mỹ Thới"
            },
            {
                "maXa": "81301097",
                "tenXa": "Phường Rạch Giá"
            },
            {
                "maXa": "80513031",
                "tenXa": "Phường Thới Sơn"
            },
            {
                "maXa": "80507015",
                "tenXa": "Phường Tân Châu"
            },
            {
                "maXa": "81325099",
                "tenXa": "Phường Tô Châu"
            },
            {
                "maXa": "80513030",
                "tenXa": "Phường Tịnh Biên"
            },
            {
                "maXa": "81301096",
                "tenXa": "Phường Vĩnh Thông"
            },
            {
                "maXa": "80503006",
                "tenXa": "Phường Vĩnh Tế"
            },
            {
                "maXa": "81315067",
                "tenXa": "Xã An Biên"
            },
            {
                "maXa": "80519038",
                "tenXa": "Xã An Châu"
            },
            {
                "maXa": "80513028",
                "tenXa": "Xã An Cư"
            },
            {
                "maXa": "81317063",
                "tenXa": "Xã An Minh"
            },
            {
                "maXa": "80505007",
                "tenXa": "Xã An Phú"
            },
            {
                "maXa": "80515033",
                "tenXa": "Xã Ba Chúc"
            },
            {
                "maXa": "81309083",
                "tenXa": "Xã Bình An"
            },
            {
                "maXa": "81305088",
                "tenXa": "Xã Bình Giang"
            },
            {
                "maXa": "80519039",
                "tenXa": "Xã Bình Hoà"
            },
            {
                "maXa": "80511026",
                "tenXa": "Xã Bình Mỹ"
            },
            {
                "maXa": "81305087",
                "tenXa": "Xã Bình Sơn"
            },
            {
                "maXa": "80509019",
                "tenXa": "Xã Bình Thạnh Đông"
            },
            {
                "maXa": "80507013",
                "tenXa": "Xã Châu Phong"
            },
            {
                "maXa": "80511023",
                "tenXa": "Xã Châu Phú"
            },
            {
                "maXa": "81309082",
                "tenXa": "Xã Châu Thành"
            },
            {
                "maXa": "80517043",
                "tenXa": "Xã Chợ Mới"
            },
            {
                "maXa": "80509020",
                "tenXa": "Xã Chợ Vàm"
            },
            {
                "maXa": "80515036",
                "tenXa": "Xã Cô Tô"
            },
            {
                "maXa": "80517044",
                "tenXa": "Xã Cù Lao Giêng"
            },
            {
                "maXa": "80519040",
                "tenXa": "Xã Cần Đăng"
            },
            {
                "maXa": "81304089",
                "tenXa": "Xã Giang Thành"
            },
            {
                "maXa": "81311072",
                "tenXa": "Xã Giồng Riềng"
            },
            {
                "maXa": "81313069",
                "tenXa": "Xã Gò Quao"
            },
            {
                "maXa": "81311075",
                "tenXa": "Xã Hoà Hưng"
            },
            {
                "maXa": "80509021",
                "tenXa": "Xã Hoà Lạc"
            },
            {
                "maXa": "81311077",
                "tenXa": "Xã Hoà Thuận"
            },
            {
                "maXa": "81303091",
                "tenXa": "Xã Hoà Điền"
            },
            {
                "maXa": "81303094",
                "tenXa": "Xã Hòn Nghệ"
            },
            {
                "maXa": "81305084",
                "tenXa": "Xã Hòn Đất"
            },
            {
                "maXa": "80517045",
                "tenXa": "Xã Hội An"
            },
            {
                "maXa": "80505010",
                "tenXa": "Xã Khánh Bình"
            },
            {
                "maXa": "81303092",
                "tenXa": "Xã Kiên Lương"
            },
            {
                "maXa": "80517048",
                "tenXa": "Xã Long Kiến"
            },
            {
                "maXa": "81311074",
                "tenXa": "Xã Long Thạnh"
            },
            {
                "maXa": "80517046",
                "tenXa": "Xã Long Điền"
            },
            {
                "maXa": "80501001",
                "tenXa": "Xã Mỹ Hoà Hưng"
            },
            {
                "maXa": "81305086",
                "tenXa": "Xã Mỹ Thuận"
            },
            {
                "maXa": "80511024",
                "tenXa": "Xã Mỹ Đức"
            },
            {
                "maXa": "81311076",
                "tenXa": "Xã Ngọc Chúc"
            },
            {
                "maXa": "80505009",
                "tenXa": "Xã Nhơn Hội"
            },
            {
                "maXa": "80517047",
                "tenXa": "Xã Nhơn Mỹ"
            },
            {
                "maXa": "80513029",
                "tenXa": "Xã Núi Cấm"
            },
            {
                "maXa": "80509018",
                "tenXa": "Xã Phú An"
            },
            {
                "maXa": "80521052",
                "tenXa": "Xã Phú Hoà"
            },
            {
                "maXa": "80505011",
                "tenXa": "Xã Phú Hữu"
            },
            {
                "maXa": "80509022",
                "tenXa": "Xã Phú Lâm"
            },
            {
                "maXa": "80509017",
                "tenXa": "Xã Phú Tân"
            },
            {
                "maXa": "81303093",
                "tenXa": "Xã Sơn Hải"
            },
            {
                "maXa": "81305085",
                "tenXa": "Xã Sơn Kiên"
            },
            {
                "maXa": "80521049",
                "tenXa": "Xã Thoại Sơn"
            },
            {
                "maXa": "81311073",
                "tenXa": "Xã Thạnh Hưng"
            },
            {
                "maXa": "81309081",
                "tenXa": "Xã Thạnh Lộc"
            },
            {
                "maXa": "80511027",
                "tenXa": "Xã Thạnh Mỹ Tây"
            },
            {
                "maXa": "81307080",
                "tenXa": "Xã Thạnh Đông"
            },
            {
                "maXa": "81325100",
                "tenXa": "Xã Tiên Hải"
            },
            {
                "maXa": "80515034",
                "tenXa": "Xã Tri Tôn"
            },
            {
                "maXa": "80507012",
                "tenXa": "Xã Tân An"
            },
            {
                "maXa": "81307079",
                "tenXa": "Xã Tân Hiệp"
            },
            {
                "maXa": "81307078",
                "tenXa": "Xã Tân Hội"
            },
            {
                "maXa": "81317061",
                "tenXa": "Xã Tân Thạnh"
            },
            {
                "maXa": "80521054",
                "tenXa": "Xã Tây Phú"
            },
            {
                "maXa": "81315065",
                "tenXa": "Xã Tây Yên"
            },
            {
                "maXa": "81327059",
                "tenXa": "Xã U Minh Thượng"
            },
            {
                "maXa": "81317064",
                "tenXa": "Xã Vân Khánh"
            },
            {
                "maXa": "80519042",
                "tenXa": "Xã Vĩnh An"
            },
            {
                "maXa": "81319055",
                "tenXa": "Xã Vĩnh Bình"
            },
            {
                "maXa": "80515037",
                "tenXa": "Xã Vĩnh Gia"
            },
            {
                "maXa": "80519041",
                "tenXa": "Xã Vĩnh Hanh"
            },
            {
                "maXa": "81327058",
                "tenXa": "Xã Vĩnh Hoà"
            },
            {
                "maXa": "81313070",
                "tenXa": "Xã Vĩnh Hoà Hưng"
            },
            {
                "maXa": "80505008",
                "tenXa": "Xã Vĩnh Hậu"
            },
            {
                "maXa": "81319057",
                "tenXa": "Xã Vĩnh Phong"
            },
            {
                "maXa": "81319056",
                "tenXa": "Xã Vĩnh Thuận"
            },
            {
                "maXa": "80511025",
                "tenXa": "Xã Vĩnh Thạnh Trung"
            },
            {
                "maXa": "80521053",
                "tenXa": "Xã Vĩnh Trạch"
            },
            {
                "maXa": "81313071",
                "tenXa": "Xã Vĩnh Tuy"
            },
            {
                "maXa": "80507014",
                "tenXa": "Xã Vĩnh Xương"
            },
            {
                "maXa": "81304090",
                "tenXa": "Xã Vĩnh Điều"
            },
            {
                "maXa": "80521050",
                "tenXa": "Xã Óc Eo"
            },
            {
                "maXa": "80515035",
                "tenXa": "Xã Ô Lâm"
            },
            {
                "maXa": "81317060",
                "tenXa": "Xã Đông Hoà"
            },
            {
                "maXa": "81317062",
                "tenXa": "Xã Đông Hưng"
            },
            {
                "maXa": "81315066",
                "tenXa": "Xã Đông Thái"
            },
            {
                "maXa": "81313068",
                "tenXa": "Xã Định Hoà"
            },
            {
                "maXa": "80521051",
                "tenXa": "Xã Định Mỹ"
            },
            {
                "maXa": "81323095",
                "tenXa": "Đặc khu Kiên Hải"
            },
            {
                "maXa": "81321101",
                "tenXa": "Đặc khu Phú Quốc"
            },
            {
                "maXa": "81321102",
                "tenXa": "Đặc khu Thổ Châu"
            }
        ]
    },
    {
        "maThanhPho": "02",
        "thanhPho": "Tỉnh Bắc Ninh",
        "xaPhuong": [
            {
                "maXa": "22101051",
                "tenXa": "Phường Bắc Giang"
            },
            {
                "maXa": "22305077",
                "tenXa": "Phường Bồng Lai"
            },
            {
                "maXa": "22121017",
                "tenXa": "Phường Chũ"
            },
            {
                "maXa": "22101057",
                "tenXa": "Phường Cảnh Thụy"
            },
            {
                "maXa": "22301061",
                "tenXa": "Phường Hạp Lĩnh"
            },
            {
                "maXa": "22301058",
                "tenXa": "Phường Kinh Bắc"
            },
            {
                "maXa": "22309068",
                "tenXa": "Phường Mão Điền"
            },
            {
                "maXa": "22301062",
                "tenXa": "Phường Nam Sơn"
            },
            {
                "maXa": "22305075",
                "tenXa": "Phường Nhân Hoà"
            },
            {
                "maXa": "22309072",
                "tenXa": "Phường Ninh Xá"
            },
            {
                "maXa": "22117048",
                "tenXa": "Phường Nếnh"
            },
            {
                "maXa": "22313066",
                "tenXa": "Phường Phù Khê"
            },
            {
                "maXa": "22305074",
                "tenXa": "Phường Phương Liễu"
            },
            {
                "maXa": "22121018",
                "tenXa": "Phường Phượng Sơn"
            },
            {
                "maXa": "22305073",
                "tenXa": "Phường Quế Võ"
            },
            {
                "maXa": "22309071",
                "tenXa": "Phường Song Liễu"
            },
            {
                "maXa": "22313064",
                "tenXa": "Phường Tam Sơn"
            },
            {
                "maXa": "22309067",
                "tenXa": "Phường Thuận Thành"
            },
            {
                "maXa": "22101053",
                "tenXa": "Phường Tiền Phong"
            },
            {
                "maXa": "22309070",
                "tenXa": "Phường Trí Quả"
            },
            {
                "maXa": "22309069",
                "tenXa": "Phường Trạm Lộ"
            },
            {
                "maXa": "22101054",
                "tenXa": "Phường Tân An"
            },
            {
                "maXa": "22101056",
                "tenXa": "Phường Tân Tiến"
            },
            {
                "maXa": "22313063",
                "tenXa": "Phường Từ Sơn"
            },
            {
                "maXa": "22117046",
                "tenXa": "Phường Tự Lạn"
            },
            {
                "maXa": "22117047",
                "tenXa": "Phường Việt Yên"
            },
            {
                "maXa": "22117049",
                "tenXa": "Phường Vân Hà"
            },
            {
                "maXa": "22301059",
                "tenXa": "Phường Võ Cường"
            },
            {
                "maXa": "22301060",
                "tenXa": "Phường Vũ Ninh"
            },
            {
                "maXa": "22101055",
                "tenXa": "Phường Yên Dũng"
            },
            {
                "maXa": "22101052",
                "tenXa": "Phường Đa Mai"
            },
            {
                "maXa": "22305076",
                "tenXa": "Phường Đào Viên"
            },
            {
                "maXa": "22313065",
                "tenXa": "Phường Đồng Nguyên"
            },
            {
                "maXa": "22113006",
                "tenXa": "Xã An Lạc"
            },
            {
                "maXa": "22107013",
                "tenXa": "Xã Biên Sơn"
            },
            {
                "maXa": "22107008",
                "tenXa": "Xã Biển Động"
            },
            {
                "maXa": "22115026",
                "tenXa": "Xã Bảo Đài"
            },
            {
                "maXa": "22115025",
                "tenXa": "Xã Bắc Lũng"
            },
            {
                "maXa": "22103033",
                "tenXa": "Xã Bố Hạ"
            },
            {
                "maXa": "22315093",
                "tenXa": "Xã Cao Đức"
            },
            {
                "maXa": "22305078",
                "tenXa": "Xã Chi Lăng"
            },
            {
                "maXa": "22115021",
                "tenXa": "Xã Cẩm Lý"
            },
            {
                "maXa": "22113004",
                "tenXa": "Xã Dương Hưu"
            },
            {
                "maXa": "22315090",
                "tenXa": "Xã Gia Bình"
            },
            {
                "maXa": "22109043",
                "tenXa": "Xã Hiệp Hoà"
            },
            {
                "maXa": "22109044",
                "tenXa": "Xã Hoàng Vân"
            },
            {
                "maXa": "22109042",
                "tenXa": "Xã Hợp Thịnh"
            },
            {
                "maXa": "22121016",
                "tenXa": "Xã Kiên Lao"
            },
            {
                "maXa": "22111029",
                "tenXa": "Xã Kép"
            },
            {
                "maXa": "22307086",
                "tenXa": "Xã Liên Bão"
            },
            {
                "maXa": "22311096",
                "tenXa": "Xã Lâm Thao"
            },
            {
                "maXa": "22311095",
                "tenXa": "Xã Lương Tài"
            },
            {
                "maXa": "22111027",
                "tenXa": "Xã Lạng Giang"
            },
            {
                "maXa": "22115024",
                "tenXa": "Xã Lục Nam"
            },
            {
                "maXa": "22107009",
                "tenXa": "Xã Lục Ngạn"
            },
            {
                "maXa": "22115019",
                "tenXa": "Xã Lục Sơn"
            },
            {
                "maXa": "22111028",
                "tenXa": "Xã Mỹ Thái"
            },
            {
                "maXa": "22107015",
                "tenXa": "Xã Nam Dương"
            },
            {
                "maXa": "22115023",
                "tenXa": "Xã Nghĩa Phương"
            },
            {
                "maXa": "22105038",
                "tenXa": "Xã Ngọc Thiện"
            },
            {
                "maXa": "22315091",
                "tenXa": "Xã Nhân Thắng"
            },
            {
                "maXa": "22105039",
                "tenXa": "Xã Nhã Nam"
            },
            {
                "maXa": "22305079",
                "tenXa": "Xã Phù Lãng"
            },
            {
                "maXa": "22105040",
                "tenXa": "Xã Phúc Hoà"
            },
            {
                "maXa": "22307089",
                "tenXa": "Xã Phật Tích"
            },
            {
                "maXa": "22105041",
                "tenXa": "Xã Quang Trung"
            },
            {
                "maXa": "22107014",
                "tenXa": "Xã Sa Lý"
            },
            {
                "maXa": "22107011",
                "tenXa": "Xã Sơn Hải"
            },
            {
                "maXa": "22113002",
                "tenXa": "Xã Sơn Động"
            },
            {
                "maXa": "22303082",
                "tenXa": "Xã Tam Giang"
            },
            {
                "maXa": "22103036",
                "tenXa": "Xã Tam Tiến"
            },
            {
                "maXa": "22303084",
                "tenXa": "Xã Tam Đa"
            },
            {
                "maXa": "22307085",
                "tenXa": "Xã Tiên Du"
            },
            {
                "maXa": "22111031",
                "tenXa": "Xã Tiên Lục"
            },
            {
                "maXa": "22311097",
                "tenXa": "Xã Trung Chính"
            },
            {
                "maXa": "22311098",
                "tenXa": "Xã Trung Kênh"
            },
            {
                "maXa": "22115020",
                "tenXa": "Xã Trường Sơn"
            },
            {
                "maXa": "22113099",
                "tenXa": "Xã Tuấn Đạo"
            },
            {
                "maXa": "22307087",
                "tenXa": "Xã Tân Chi"
            },
            {
                "maXa": "22111030",
                "tenXa": "Xã Tân Dĩnh"
            },
            {
                "maXa": "22107012",
                "tenXa": "Xã Tân Sơn"
            },
            {
                "maXa": "22105037",
                "tenXa": "Xã Tân Yên"
            },
            {
                "maXa": "22113003",
                "tenXa": "Xã Tây Yên Tử"
            },
            {
                "maXa": "22113007",
                "tenXa": "Xã Vân Sơn"
            },
            {
                "maXa": "22303081",
                "tenXa": "Xã Văn Môn"
            },
            {
                "maXa": "22109045",
                "tenXa": "Xã Xuân Cẩm"
            },
            {
                "maXa": "22103035",
                "tenXa": "Xã Xuân Lương"
            },
            {
                "maXa": "22303080",
                "tenXa": "Xã Yên Phong"
            },
            {
                "maXa": "22103032",
                "tenXa": "Xã Yên Thế"
            },
            {
                "maXa": "22303083",
                "tenXa": "Xã Yên Trung"
            },
            {
                "maXa": "22113005",
                "tenXa": "Xã Yên Định"
            },
            {
                "maXa": "22107010",
                "tenXa": "Xã Đèo Gia"
            },
            {
                "maXa": "22315094",
                "tenXa": "Xã Đông Cứu"
            },
            {
                "maXa": "22115022",
                "tenXa": "Xã Đông Phú"
            },
            {
                "maXa": "22315092",
                "tenXa": "Xã Đại Lai"
            },
            {
                "maXa": "22113001",
                "tenXa": "Xã Đại Sơn"
            },
            {
                "maXa": "22307088",
                "tenXa": "Xã Đại Đồng"
            },
            {
                "maXa": "22103034",
                "tenXa": "Xã Đồng Kỳ"
            },
            {
                "maXa": "22101050",
                "tenXa": "Xã Đồng Việt"
            }
        ]
    },
    {
        "maThanhPho": "07",
        "thanhPho": "Tỉnh Cao Bằng",
        "xaPhuong": [
            {
                "maXa": "20301002",
                "tenXa": "Phường Nùng Trí Cao"
            },
            {
                "maXa": "20301001",
                "tenXa": "Phường Thục Phán"
            },
            {
                "maXa": "20301003",
                "tenXa": "Phường Tân Giang"
            },
            {
                "maXa": "20315033",
                "tenXa": "Xã Bạch Đằng"
            },
            {
                "maXa": "20323007",
                "tenXa": "Xã Bảo Lâm"
            },
            {
                "maXa": "20303011",
                "tenXa": "Xã Bảo Lạc"
            },
            {
                "maXa": "20317042",
                "tenXa": "Xã Bế Văn Đàn"
            },
            {
                "maXa": "20313017",
                "tenXa": "Xã Ca Thành"
            },
            {
                "maXa": "20321036",
                "tenXa": "Xã Canh Tân"
            },
            {
                "maXa": "20303013",
                "tenXa": "Xã Cô Ba"
            },
            {
                "maXa": "20305025",
                "tenXa": "Xã Cần Yên"
            },
            {
                "maXa": "20303012",
                "tenXa": "Xã Cốc Pàng"
            },
            {
                "maXa": "20315032",
                "tenXa": "Xã Hoà An"
            },
            {
                "maXa": "20303016",
                "tenXa": "Xã Huy Giáp"
            },
            {
                "maXa": "20305028",
                "tenXa": "Xã Hà Quảng"
            },
            {
                "maXa": "20303010",
                "tenXa": "Xã Hưng Đạo"
            },
            {
                "maXa": "20319054",
                "tenXa": "Xã Hạ Lang"
            },
            {
                "maXa": "20317045",
                "tenXa": "Xã Hạnh Phúc"
            },
            {
                "maXa": "20303014",
                "tenXa": "Xã Khánh Xuân"
            },
            {
                "maXa": "20321037",
                "tenXa": "Xã Kim Đồng"
            },
            {
                "maXa": "20323006",
                "tenXa": "Xã Lý Bôn"
            },
            {
                "maXa": "20319053",
                "tenXa": "Xã Lý Quốc"
            },
            {
                "maXa": "20305029",
                "tenXa": "Xã Lũng Nặm"
            },
            {
                "maXa": "20321035",
                "tenXa": "Xã Minh Khai"
            },
            {
                "maXa": "20313023",
                "tenXa": "Xã Minh Tâm"
            },
            {
                "maXa": "20323005",
                "tenXa": "Xã Nam Quang"
            },
            {
                "maXa": "20315031",
                "tenXa": "Xã Nam Tuấn"
            },
            {
                "maXa": "20313022",
                "tenXa": "Xã Nguyên Bình"
            },
            {
                "maXa": "20315034",
                "tenXa": "Xã Nguyễn Huệ"
            },
            {
                "maXa": "20313018",
                "tenXa": "Xã Phan Thanh"
            },
            {
                "maXa": "20317041",
                "tenXa": "Xã Phục Hoà"
            },
            {
                "maXa": "20311046",
                "tenXa": "Xã Quang Hán"
            },
            {
                "maXa": "20319056",
                "tenXa": "Xã Quang Long"
            },
            {
                "maXa": "20311048",
                "tenXa": "Xã Quang Trung"
            },
            {
                "maXa": "20323004",
                "tenXa": "Xã Quảng Lâm"
            },
            {
                "maXa": "20317044",
                "tenXa": "Xã Quảng Uyên"
            },
            {
                "maXa": "20303009",
                "tenXa": "Xã Sơn Lộ"
            },
            {
                "maXa": "20313021",
                "tenXa": "Xã Tam Kim"
            },
            {
                "maXa": "20305024",
                "tenXa": "Xã Thanh Long"
            },
            {
                "maXa": "20313019",
                "tenXa": "Xã Thành Công"
            },
            {
                "maXa": "20305026",
                "tenXa": "Xã Thông Nông"
            },
            {
                "maXa": "20321038",
                "tenXa": "Xã Thạch An"
            },
            {
                "maXa": "20311047",
                "tenXa": "Xã Trà Lĩnh"
            },
            {
                "maXa": "20311050",
                "tenXa": "Xã Trùng Khánh"
            },
            {
                "maXa": "20305027",
                "tenXa": "Xã Trường Hà"
            },
            {
                "maXa": "20313020",
                "tenXa": "Xã Tĩnh Túc"
            },
            {
                "maXa": "20305030",
                "tenXa": "Xã Tổng Cọt"
            },
            {
                "maXa": "20319055",
                "tenXa": "Xã Vinh Quý"
            },
            {
                "maXa": "20303015",
                "tenXa": "Xã Xuân Trường"
            },
            {
                "maXa": "20323008",
                "tenXa": "Xã Yên Thổ"
            },
            {
                "maXa": "20311049",
                "tenXa": "Xã Đoài Dương"
            },
            {
                "maXa": "20311051",
                "tenXa": "Xã Đàm Thuỷ"
            },
            {
                "maXa": "20311052",
                "tenXa": "Xã Đình Phong"
            },
            {
                "maXa": "20321039",
                "tenXa": "Xã Đông Khê"
            },
            {
                "maXa": "20317043",
                "tenXa": "Xã Độc Lập"
            },
            {
                "maXa": "20321040",
                "tenXa": "Xã Đức Long"
            }
        ]
    },
    {
        "maThanhPho": "34",
        "thanhPho": "Tỉnh Cà Mau",
        "xaPhuong": [
            {
                "maXa": "82301001",
                "tenXa": "Phường An Xuyên"
            },
            {
                "maXa": "82101040",
                "tenXa": "Phường Bạc Liêu"
            },
            {
                "maXa": "82107043",
                "tenXa": "Phường Giá Rai"
            },
            {
                "maXa": "82101042",
                "tenXa": "Phường Hiệp Thành"
            },
            {
                "maXa": "82301004",
                "tenXa": "Phường Hòa Thành"
            },
            {
                "maXa": "82107044",
                "tenXa": "Phường Láng Tròn"
            },
            {
                "maXa": "82301002",
                "tenXa": "Phường Lý Văn Lâm"
            },
            {
                "maXa": "82301003",
                "tenXa": "Phường Tân Thành"
            },
            {
                "maXa": "82101041",
                "tenXa": "Phường Vĩnh Trạch"
            },
            {
                "maXa": "82111052",
                "tenXa": "Xã An Trạch"
            },
            {
                "maXa": "82303028",
                "tenXa": "Xã Biển Bạch"
            },
            {
                "maXa": "82105064",
                "tenXa": "Xã Châu Thới"
            },
            {
                "maXa": "82309039",
                "tenXa": "Xã Cái Nước"
            },
            {
                "maXa": "82308032",
                "tenXa": "Xã Cái Đôi Vàm"
            },
            {
                "maXa": "82111050",
                "tenXa": "Xã Gành Hào"
            },
            {
                "maXa": "82106055",
                "tenXa": "Xã Hoà Bình"
            },
            {
                "maXa": "82105063",
                "tenXa": "Xã Hưng Hội"
            },
            {
                "maXa": "82309038",
                "tenXa": "Xã Hưng Mỹ"
            },
            {
                "maXa": "82303027",
                "tenXa": "Xã Hồ Thị Kỷ"
            },
            {
                "maXa": "82103046",
                "tenXa": "Xã Hồng Dân"
            },
            {
                "maXa": "82305015",
                "tenXa": "Xã Khánh An"
            },
            {
                "maXa": "82307019",
                "tenXa": "Xã Khánh Bình"
            },
            {
                "maXa": "82307021",
                "tenXa": "Xã Khánh Hưng"
            },
            {
                "maXa": "82305014",
                "tenXa": "Xã Khánh Lâm"
            },
            {
                "maXa": "82111053",
                "tenXa": "Xã Long Điền"
            },
            {
                "maXa": "82309036",
                "tenXa": "Xã Lương Thế Trân"
            },
            {
                "maXa": "82305013",
                "tenXa": "Xã Nguyễn Phích"
            },
            {
                "maXa": "82308033",
                "tenXa": "Xã Nguyễn Việt Khái"
            },
            {
                "maXa": "82103049",
                "tenXa": "Xã Ninh Quới"
            },
            {
                "maXa": "82103048",
                "tenXa": "Xã Ninh Thạnh Lợi"
            },
            {
                "maXa": "82312030",
                "tenXa": "Xã Năm Căn"
            },
            {
                "maXa": "82313016",
                "tenXa": "Xã Phan Ngọc Hiển"
            },
            {
                "maXa": "82109060",
                "tenXa": "Xã Phong Hiệp"
            },
            {
                "maXa": "82107045",
                "tenXa": "Xã Phong Thạnh"
            },
            {
                "maXa": "82308035",
                "tenXa": "Xã Phú Mỹ"
            },
            {
                "maXa": "82308034",
                "tenXa": "Xã Phú Tân"
            },
            {
                "maXa": "82109058",
                "tenXa": "Xã Phước Long"
            },
            {
                "maXa": "82311011",
                "tenXa": "Xã Quách Phẩm"
            },
            {
                "maXa": "82307022",
                "tenXa": "Xã Sông Đốc"
            },
            {
                "maXa": "82312031",
                "tenXa": "Xã Tam Giang"
            },
            {
                "maXa": "82311009",
                "tenXa": "Xã Thanh Tùng"
            },
            {
                "maXa": "82303024",
                "tenXa": "Xã Thới Bình"
            },
            {
                "maXa": "82303025",
                "tenXa": "Xã Trí Phải"
            },
            {
                "maXa": "82311008",
                "tenXa": "Xã Trần Phán"
            },
            {
                "maXa": "82307023",
                "tenXa": "Xã Trần Văn Thời"
            },
            {
                "maXa": "82309037",
                "tenXa": "Xã Tân Hưng"
            },
            {
                "maXa": "82303026",
                "tenXa": "Xã Tân Lộc"
            },
            {
                "maXa": "82311005",
                "tenXa": "Xã Tân Thuận"
            },
            {
                "maXa": "82311006",
                "tenXa": "Xã Tân Tiến"
            },
            {
                "maXa": "82313018",
                "tenXa": "Xã Tân Ân"
            },
            {
                "maXa": "82311007",
                "tenXa": "Xã Tạ An Khương"
            },
            {
                "maXa": "82305012",
                "tenXa": "Xã U Minh"
            },
            {
                "maXa": "82106057",
                "tenXa": "Xã Vĩnh Hậu"
            },
            {
                "maXa": "82103047",
                "tenXa": "Xã Vĩnh Lộc"
            },
            {
                "maXa": "82105062",
                "tenXa": "Xã Vĩnh Lợi"
            },
            {
                "maXa": "82106056",
                "tenXa": "Xã Vĩnh Mỹ"
            },
            {
                "maXa": "82109059",
                "tenXa": "Xã Vĩnh Phước"
            },
            {
                "maXa": "82109061",
                "tenXa": "Xã Vĩnh Thanh"
            },
            {
                "maXa": "82307020",
                "tenXa": "Xã Đá Bạc"
            },
            {
                "maXa": "82111054",
                "tenXa": "Xã Đông Hải"
            },
            {
                "maXa": "82313017",
                "tenXa": "Xã Đất Mũi"
            },
            {
                "maXa": "82312029",
                "tenXa": "Xã Đất Mới"
            },
            {
                "maXa": "82311010",
                "tenXa": "Xã Đầm Dơi"
            },
            {
                "maXa": "82111051",
                "tenXa": "Xã Định Thành"
            }
        ]
    },
    {
        "maThanhPho": "33",
        "thanhPho": "Thành phố Cần Thơ",
        "xaPhuong": [
            {
                "maXa": "81519004",
                "tenXa": "Phường An Bình"
            },
            {
                "maXa": "81521006",
                "tenXa": "Phường Bình Thủy"
            },
            {
                "maXa": "81519002",
                "tenXa": "Phường Cái Khế"
            },
            {
                "maXa": "81523008",
                "tenXa": "Phường Cái Răng"
            },
            {
                "maXa": "81523009",
                "tenXa": "Phường Hưng Phú"
            },
            {
                "maXa": "81913090",
                "tenXa": "Phường Khánh Hoà"
            },
            {
                "maXa": "81612043",
                "tenXa": "Phường Long Bình"
            },
            {
                "maXa": "81612044",
                "tenXa": "Phường Long Mỹ"
            },
            {
                "maXa": "81612045",
                "tenXa": "Phường Long Phú 1"
            },
            {
                "maXa": "81521007",
                "tenXa": "Phường Long Tuyền"
            },
            {
                "maXa": "81912093",
                "tenXa": "Phường Mỹ Quới"
            },
            {
                "maXa": "81901063",
                "tenXa": "Phường Mỹ Xuyên"
            },
            {
                "maXa": "81607053",
                "tenXa": "Phường Ngã Bảy"
            },
            {
                "maXa": "81912092",
                "tenXa": "Phường Ngã Năm"
            },
            {
                "maXa": "81519001",
                "tenXa": "Phường Ninh Kiều"
            },
            {
                "maXa": "81901061",
                "tenXa": "Phường Phú Lợi"
            },
            {
                "maXa": "81505012",
                "tenXa": "Phường Phước Thới"
            },
            {
                "maXa": "81901062",
                "tenXa": "Phường Sóc Trăng"
            },
            {
                "maXa": "81503015",
                "tenXa": "Phường Thuận Hưng"
            },
            {
                "maXa": "81503014",
                "tenXa": "Phường Thốt Nốt"
            },
            {
                "maXa": "81521005",
                "tenXa": "Phường Thới An Đông"
            },
            {
                "maXa": "81505011",
                "tenXa": "Phường Thới Long"
            },
            {
                "maXa": "81503013",
                "tenXa": "Phường Trung Nhứt"
            },
            {
                "maXa": "81519003",
                "tenXa": "Phường Tân An"
            },
            {
                "maXa": "81503016",
                "tenXa": "Phường Tân Lộc"
            },
            {
                "maXa": "81913089",
                "tenXa": "Phường Vĩnh Châu"
            },
            {
                "maXa": "81913088",
                "tenXa": "Phường Vĩnh Phước"
            },
            {
                "maXa": "81601034",
                "tenXa": "Phường Vị Thanh"
            },
            {
                "maXa": "81601035",
                "tenXa": "Phường Vị Tân"
            },
            {
                "maXa": "81505010",
                "tenXa": "Phường Ô Môn"
            },
            {
                "maXa": "81607052",
                "tenXa": "Phường Đại Thành"
            },
            {
                "maXa": "81903074",
                "tenXa": "Xã An Lạc Thôn"
            },
            {
                "maXa": "81915079",
                "tenXa": "Xã An Ninh"
            },
            {
                "maXa": "81906102",
                "tenXa": "Xã An Thạnh"
            },
            {
                "maXa": "81605049",
                "tenXa": "Xã Châu Thành"
            },
            {
                "maXa": "81906103",
                "tenXa": "Xã Cù Lao Dung"
            },
            {
                "maXa": "81527024",
                "tenXa": "Xã Cờ Đỏ"
            },
            {
                "maXa": "81909065",
                "tenXa": "Xã Gia Hoà"
            },
            {
                "maXa": "81608058",
                "tenXa": "Xã Hiệp Hưng"
            },
            {
                "maXa": "81608055",
                "tenXa": "Xã Hoà An"
            },
            {
                "maXa": "81909064",
                "tenXa": "Xã Hoà Tú"
            },
            {
                "maXa": "81601033",
                "tenXa": "Xã Hỏa Lựu"
            },
            {
                "maXa": "81915081",
                "tenXa": "Xã Hồ Đắc Kiện"
            },
            {
                "maXa": "81903075",
                "tenXa": "Xã Kế Sách"
            },
            {
                "maXa": "81913087",
                "tenXa": "Xã Lai Hoà"
            },
            {
                "maXa": "81917099",
                "tenXa": "Xã Liêu Tú"
            },
            {
                "maXa": "81907083",
                "tenXa": "Xã Long Hưng"
            },
            {
                "maXa": "81905071",
                "tenXa": "Xã Long Phú"
            },
            {
                "maXa": "81911096",
                "tenXa": "Xã Lâm Tân"
            },
            {
                "maXa": "81611042",
                "tenXa": "Xã Lương Tâm"
            },
            {
                "maXa": "81917100",
                "tenXa": "Xã Lịch Hội Thượng"
            },
            {
                "maXa": "81907085",
                "tenXa": "Xã Mỹ Hương"
            },
            {
                "maXa": "81907084",
                "tenXa": "Xã Mỹ Phước"
            },
            {
                "maXa": "81907082",
                "tenXa": "Xã Mỹ Tú"
            },
            {
                "maXa": "81909067",
                "tenXa": "Xã Ngọc Tố"
            },
            {
                "maXa": "81909066",
                "tenXa": "Xã Nhu Gia"
            },
            {
                "maXa": "81903072",
                "tenXa": "Xã Nhơn Mỹ"
            },
            {
                "maXa": "81529018",
                "tenXa": "Xã Nhơn Ái"
            },
            {
                "maXa": "81903073",
                "tenXa": "Xã Phong Nẫm"
            },
            {
                "maXa": "81529017",
                "tenXa": "Xã Phong Điền"
            },
            {
                "maXa": "81605051",
                "tenXa": "Xã Phú Hữu"
            },
            {
                "maXa": "81911094",
                "tenXa": "Xã Phú Lộc"
            },
            {
                "maXa": "81915078",
                "tenXa": "Xã Phú Tâm"
            },
            {
                "maXa": "81608056",
                "tenXa": "Xã Phương Bình"
            },
            {
                "maXa": "81608059",
                "tenXa": "Xã Phụng Hiệp"
            },
            {
                "maXa": "81915080",
                "tenXa": "Xã Thuận Hoà"
            },
            {
                "maXa": "81525031",
                "tenXa": "Xã Thạnh An"
            },
            {
                "maXa": "81608060",
                "tenXa": "Xã Thạnh Hoà"
            },
            {
                "maXa": "81527026",
                "tenXa": "Xã Thạnh Phú"
            },
            {
                "maXa": "81525032",
                "tenXa": "Xã Thạnh Quới"
            },
            {
                "maXa": "81917097",
                "tenXa": "Xã Thạnh Thới An"
            },
            {
                "maXa": "81603046",
                "tenXa": "Xã Thạnh Xuân"
            },
            {
                "maXa": "81903076",
                "tenXa": "Xã Thới An Hội"
            },
            {
                "maXa": "81527027",
                "tenXa": "Xã Thới Hưng"
            },
            {
                "maXa": "81531020",
                "tenXa": "Xã Thới Lai"
            },
            {
                "maXa": "81527028",
                "tenXa": "Xã Trung Hưng"
            },
            {
                "maXa": "81905068",
                "tenXa": "Xã Trường Khánh"
            },
            {
                "maXa": "81529019",
                "tenXa": "Xã Trường Long"
            },
            {
                "maXa": "81603048",
                "tenXa": "Xã Trường Long Tây"
            },
            {
                "maXa": "81531023",
                "tenXa": "Xã Trường Thành"
            },
            {
                "maXa": "81531022",
                "tenXa": "Xã Trường Xuân"
            },
            {
                "maXa": "81917101",
                "tenXa": "Xã Trần Đề"
            },
            {
                "maXa": "81917098",
                "tenXa": "Xã Tài Văn"
            },
            {
                "maXa": "81608054",
                "tenXa": "Xã Tân Bình"
            },
            {
                "maXa": "81603047",
                "tenXa": "Xã Tân Hoà"
            },
            {
                "maXa": "81912091",
                "tenXa": "Xã Tân Long"
            },
            {
                "maXa": "81608057",
                "tenXa": "Xã Tân Phước Hưng"
            },
            {
                "maXa": "81905070",
                "tenXa": "Xã Tân Thạnh"
            },
            {
                "maXa": "81913086",
                "tenXa": "Xã Vĩnh Hải"
            },
            {
                "maXa": "81911095",
                "tenXa": "Xã Vĩnh Lợi"
            },
            {
                "maXa": "81609037",
                "tenXa": "Xã Vĩnh Thuận Đông"
            },
            {
                "maXa": "81525029",
                "tenXa": "Xã Vĩnh Thạnh"
            },
            {
                "maXa": "81525030",
                "tenXa": "Xã Vĩnh Trinh"
            },
            {
                "maXa": "81609039",
                "tenXa": "Xã Vĩnh Tường"
            },
            {
                "maXa": "81611040",
                "tenXa": "Xã Vĩnh Viễn"
            },
            {
                "maXa": "81609038",
                "tenXa": "Xã Vị Thanh 1"
            },
            {
                "maXa": "81609036",
                "tenXa": "Xã Vị Thủy"
            },
            {
                "maXa": "81611041",
                "tenXa": "Xã Xà Phiên"
            },
            {
                "maXa": "81527025",
                "tenXa": "Xã Đông Hiệp"
            },
            {
                "maXa": "81605050",
                "tenXa": "Xã Đông Phước"
            },
            {
                "maXa": "81531021",
                "tenXa": "Xã Đông Thuận"
            },
            {
                "maXa": "81903077",
                "tenXa": "Xã Đại Hải"
            },
            {
                "maXa": "81905069",
                "tenXa": "Xã Đại Ngãi"
            }
        ]
    },
    {
        "maThanhPho": "24",
        "thanhPho": "Tỉnh Gia Lai",
        "xaPhuong": [
            {
                "maXa": "60311083",
                "tenXa": "Phường An Bình"
            },
            {
                "maXa": "60311082",
                "tenXa": "Phường An Khê"
            },
            {
                "maXa": "50717007",
                "tenXa": "Phường An Nhơn"
            },
            {
                "maXa": "50717010",
                "tenXa": "Phường An Nhơn Bắc"
            },
            {
                "maXa": "50717009",
                "tenXa": "Phường An Nhơn Nam"
            },
            {
                "maXa": "50717008",
                "tenXa": "Phường An Nhơn Đông"
            },
            {
                "maXa": "60301062",
                "tenXa": "Phường An Phú"
            },
            {
                "maXa": "60321098",
                "tenXa": "Phường Ayun Pa"
            },
            {
                "maXa": "50717006",
                "tenXa": "Phường Bình Định"
            },
            {
                "maXa": "50705012",
                "tenXa": "Phường Bồng Sơn"
            },
            {
                "maXa": "60301061",
                "tenXa": "Phường Diên Hồng"
            },
            {
                "maXa": "50705013",
                "tenXa": "Phường Hoài Nhơn"
            },
            {
                "maXa": "50705018",
                "tenXa": "Phường Hoài Nhơn Bắc"
            },
            {
                "maXa": "50705017",
                "tenXa": "Phường Hoài Nhơn Nam"
            },
            {
                "maXa": "50705016",
                "tenXa": "Phường Hoài Nhơn Tây"
            },
            {
                "maXa": "50705015",
                "tenXa": "Phường Hoài Nhơn Đông"
            },
            {
                "maXa": "60301059",
                "tenXa": "Phường Hội Phú"
            },
            {
                "maXa": "60301058",
                "tenXa": "Phường Pleiku"
            },
            {
                "maXa": "50701001",
                "tenXa": "Phường Quy Nhơn"
            },
            {
                "maXa": "50701005",
                "tenXa": "Phường Quy Nhơn Bắc"
            },
            {
                "maXa": "50701004",
                "tenXa": "Phường Quy Nhơn Nam"
            },
            {
                "maXa": "50701003",
                "tenXa": "Phường Quy Nhơn Tây"
            },
            {
                "maXa": "50701002",
                "tenXa": "Phường Quy Nhơn Đông"
            },
            {
                "maXa": "50705014",
                "tenXa": "Phường Tam Quan"
            },
            {
                "maXa": "60301060",
                "tenXa": "Phường Thống Nhất"
            },
            {
                "maXa": "60319078",
                "tenXa": "Xã Albá"
            },
            {
                "maXa": "50703054",
                "tenXa": "Xã An Hoà"
            },
            {
                "maXa": "50703055",
                "tenXa": "Xã An Lão"
            },
            {
                "maXa": "50709027",
                "tenXa": "Xã An Lương"
            },
            {
                "maXa": "50717011",
                "tenXa": "Xã An Nhơn Tây"
            },
            {
                "maXa": "50703057",
                "tenXa": "Xã An Toàn"
            },
            {
                "maXa": "50703056",
                "tenXa": "Xã An Vinh"
            },
            {
                "maXa": "60305120",
                "tenXa": "Xã Ayun"
            },
            {
                "maXa": "60301063",
                "tenXa": "Xã Biển Hồ"
            },
            {
                "maXa": "60317070",
                "tenXa": "Xã Bàu Cạn"
            },
            {
                "maXa": "50715041",
                "tenXa": "Xã Bình An"
            },
            {
                "maXa": "50709028",
                "tenXa": "Xã Bình Dương"
            },
            {
                "maXa": "50715040",
                "tenXa": "Xã Bình Hiệp"
            },
            {
                "maXa": "50715038",
                "tenXa": "Xã Bình Khê"
            },
            {
                "maXa": "50715039",
                "tenXa": "Xã Bình Phú"
            },
            {
                "maXa": "60319076",
                "tenXa": "Xã Bờ Ngoong"
            },
            {
                "maXa": "50721049",
                "tenXa": "Xã Canh Liên"
            },
            {
                "maXa": "50721048",
                "tenXa": "Xã Canh Vinh"
            },
            {
                "maXa": "60313097",
                "tenXa": "Xã Chơ Long"
            },
            {
                "maXa": "60329102",
                "tenXa": "Xã Chư A Thai"
            },
            {
                "maXa": "60313094",
                "tenXa": "Xã Chư Krey"
            },
            {
                "maXa": "60317069",
                "tenXa": "Xã Chư Prông"
            },
            {
                "maXa": "60307066",
                "tenXa": "Xã Chư Păh"
            },
            {
                "maXa": "60331079",
                "tenXa": "Xã Chư Pưh"
            },
            {
                "maXa": "60319075",
                "tenXa": "Xã Chư Sê"
            },
            {
                "maXa": "50713022",
                "tenXa": "Xã Cát Tiến"
            },
            {
                "maXa": "60311084",
                "tenXa": "Xã Cửu An"
            },
            {
                "maXa": "60301064",
                "tenXa": "Xã Gào"
            },
            {
                "maXa": "50713024",
                "tenXa": "Xã Hoà Hội"
            },
            {
                "maXa": "50707042",
                "tenXa": "Xã Hoài Ân"
            },
            {
                "maXa": "60305119",
                "tenXa": "Xã Hra"
            },
            {
                "maXa": "50713025",
                "tenXa": "Xã Hội Sơn"
            },
            {
                "maXa": "60317071",
                "tenXa": "Xã Ia Boòng"
            },
            {
                "maXa": "60325113",
                "tenXa": "Xã Ia Băng"
            },
            {
                "maXa": "60309133",
                "tenXa": "Xã Ia Chia"
            },
            {
                "maXa": "60315132",
                "tenXa": "Xã Ia Dom"
            },
            {
                "maXa": "60323108",
                "tenXa": "Xã Ia Dreh"
            },
            {
                "maXa": "60315125",
                "tenXa": "Xã Ia Dơk"
            },
            {
                "maXa": "60309121",
                "tenXa": "Xã Ia Grai"
            },
            {
                "maXa": "60329103",
                "tenXa": "Xã Ia Hiao"
            },
            {
                "maXa": "60309123",
                "tenXa": "Xã Ia Hrung"
            },
            {
                "maXa": "60331081",
                "tenXa": "Xã Ia Hrú"
            },
            {
                "maXa": "60307067",
                "tenXa": "Xã Ia Khươl"
            },
            {
                "maXa": "60319077",
                "tenXa": "Xã Ia Ko"
            },
            {
                "maXa": "60309122",
                "tenXa": "Xã Ia Krái"
            },
            {
                "maXa": "60315126",
                "tenXa": "Xã Ia Krêl"
            },
            {
                "maXa": "60331080",
                "tenXa": "Xã Ia Le"
            },
            {
                "maXa": "60307065",
                "tenXa": "Xã Ia Ly"
            },
            {
                "maXa": "60317072",
                "tenXa": "Xã Ia Lâu"
            },
            {
                "maXa": "60317129",
                "tenXa": "Xã Ia Mơ"
            },
            {
                "maXa": "60315131",
                "tenXa": "Xã Ia Nan"
            },
            {
                "maXa": "60309134",
                "tenXa": "Xã Ia O"
            },
            {
                "maXa": "60320105",
                "tenXa": "Xã Ia Pa"
            },
            {
                "maXa": "60307068",
                "tenXa": "Xã Ia Phí"
            },
            {
                "maXa": "60317073",
                "tenXa": "Xã Ia Pia"
            },
            {
                "maXa": "60315130",
                "tenXa": "Xã Ia Pnôn"
            },
            {
                "maXa": "60317128",
                "tenXa": "Xã Ia Púch"
            },
            {
                "maXa": "60321099",
                "tenXa": "Xã Ia Rbol"
            },
            {
                "maXa": "60323109",
                "tenXa": "Xã Ia Rsai"
            },
            {
                "maXa": "60321100",
                "tenXa": "Xã Ia Sao"
            },
            {
                "maXa": "60320106",
                "tenXa": "Xã Ia Tul"
            },
            {
                "maXa": "60317074",
                "tenXa": "Xã Ia Tôr"
            },
            {
                "maXa": "60303087",
                "tenXa": "Xã Kbang"
            },
            {
                "maXa": "60325114",
                "tenXa": "Xã KDang"
            },
            {
                "maXa": "50707044",
                "tenXa": "Xã Kim Sơn"
            },
            {
                "maXa": "60305118",
                "tenXa": "Xã Kon Chiêng"
            },
            {
                "maXa": "60325112",
                "tenXa": "Xã Kon Gang"
            },
            {
                "maXa": "60303135",
                "tenXa": "Xã Krong"
            },
            {
                "maXa": "60303088",
                "tenXa": "Xã Kông Bơ La"
            },
            {
                "maXa": "60313092",
                "tenXa": "Xã Kông Chro"
            },
            {
                "maXa": "60305117",
                "tenXa": "Xã Lơ Pang"
            },
            {
                "maXa": "60305116",
                "tenXa": "Xã Mang Yang"
            },
            {
                "maXa": "50713021",
                "tenXa": "Xã Ngô Mây"
            },
            {
                "maXa": "50701127",
                "tenXa": "Xã Nhơn Châu"
            },
            {
                "maXa": "50713019",
                "tenXa": "Xã Phù Cát"
            },
            {
                "maXa": "50709026",
                "tenXa": "Xã Phù Mỹ"
            },
            {
                "maXa": "50709032",
                "tenXa": "Xã Phù Mỹ Bắc"
            },
            {
                "maXa": "50709031",
                "tenXa": "Xã Phù Mỹ Nam"
            },
            {
                "maXa": "50709030",
                "tenXa": "Xã Phù Mỹ Tây"
            },
            {
                "maXa": "50709029",
                "tenXa": "Xã Phù Mỹ Đông"
            },
            {
                "maXa": "60329101",
                "tenXa": "Xã Phú Thiện"
            },
            {
                "maXa": "60323107",
                "tenXa": "Xã Phú Túc"
            },
            {
                "maXa": "60320104",
                "tenXa": "Xã Pờ Tó"
            },
            {
                "maXa": "60313095",
                "tenXa": "Xã SRó"
            },
            {
                "maXa": "60303090",
                "tenXa": "Xã Sơn Lang"
            },
            {
                "maXa": "50719033",
                "tenXa": "Xã Tuy Phước"
            },
            {
                "maXa": "50719036",
                "tenXa": "Xã Tuy Phước Bắc"
            },
            {
                "maXa": "50719035",
                "tenXa": "Xã Tuy Phước Tây"
            },
            {
                "maXa": "50719034",
                "tenXa": "Xã Tuy Phước Đông"
            },
            {
                "maXa": "50715037",
                "tenXa": "Xã Tây Sơn"
            },
            {
                "maXa": "60303089",
                "tenXa": "Xã Tơ Tung"
            },
            {
                "maXa": "60323110",
                "tenXa": "Xã Uar"
            },
            {
                "maXa": "50721047",
                "tenXa": "Xã Vân Canh"
            },
            {
                "maXa": "50711052",
                "tenXa": "Xã Vĩnh Quang"
            },
            {
                "maXa": "50711053",
                "tenXa": "Xã Vĩnh Sơn"
            },
            {
                "maXa": "50711050",
                "tenXa": "Xã Vĩnh Thạnh"
            },
            {
                "maXa": "50711051",
                "tenXa": "Xã Vĩnh Thịnh"
            },
            {
                "maXa": "50707045",
                "tenXa": "Xã Vạn Đức"
            },
            {
                "maXa": "50713020",
                "tenXa": "Xã Xuân An"
            },
            {
                "maXa": "60327086",
                "tenXa": "Xã Ya Hội"
            },
            {
                "maXa": "60313093",
                "tenXa": "Xã Ya Ma"
            },
            {
                "maXa": "50707046",
                "tenXa": "Xã Ân Hảo"
            },
            {
                "maXa": "50707043",
                "tenXa": "Xã Ân Tường"
            },
            {
                "maXa": "60327085",
                "tenXa": "Xã Đak Pơ"
            },
            {
                "maXa": "60303091",
                "tenXa": "Xã Đak Rong"
            },
            {
                "maXa": "60325115",
                "tenXa": "Xã Đak Sơmei"
            },
            {
                "maXa": "60325111",
                "tenXa": "Xã Đak Đoa"
            },
            {
                "maXa": "60313096",
                "tenXa": "Xã Đăk Song"
            },
            {
                "maXa": "50713023",
                "tenXa": "Xã Đề Gi"
            },
            {
                "maXa": "60315124",
                "tenXa": "Xã Đức Cơ"
            }
        ]
    },
    {
        "maThanhPho": "20",
        "thanhPho": "Thành phố Huế",
        "xaPhuong": [
            {
                "maXa": "41101006",
                "tenXa": "Phường An Cựu"
            },
            {
                "maXa": "41101040",
                "tenXa": "Phường Dương Nỗ"
            },
            {
                "maXa": "41119002",
                "tenXa": "Phường Hóa Châu"
            },
            {
                "maXa": "41119009",
                "tenXa": "Phường Hương An"
            },
            {
                "maXa": "41111014",
                "tenXa": "Phường Hương Thủy"
            },
            {
                "maXa": "41107011",
                "tenXa": "Phường Hương Trà"
            },
            {
                "maXa": "41119008",
                "tenXa": "Phường Kim Long"
            },
            {
                "maXa": "41107012",
                "tenXa": "Phường Kim Trà"
            },
            {
                "maXa": "41109003",
                "tenXa": "Phường Mỹ Thượng"
            },
            {
                "maXa": "41103018",
                "tenXa": "Phường Phong Dinh"
            },
            {
                "maXa": "41103019",
                "tenXa": "Phường Phong Phú"
            },
            {
                "maXa": "41105020",
                "tenXa": "Phường Phong Quảng"
            },
            {
                "maXa": "41103017",
                "tenXa": "Phường Phong Thái"
            },
            {
                "maXa": "41103016",
                "tenXa": "Phường Phong Điền"
            },
            {
                "maXa": "41111015",
                "tenXa": "Phường Phú Bài"
            },
            {
                "maXa": "41119010",
                "tenXa": "Phường Phú Xuân"
            },
            {
                "maXa": "41111013",
                "tenXa": "Phường Thanh Thủy"
            },
            {
                "maXa": "41109001",
                "tenXa": "Phường Thuận An"
            },
            {
                "maXa": "41101005",
                "tenXa": "Phường Thuận Hóa"
            },
            {
                "maXa": "41101007",
                "tenXa": "Phường Thủy Xuân"
            },
            {
                "maXa": "41101004",
                "tenXa": "Phường Vỹ Dạ"
            },
            {
                "maXa": "41115035",
                "tenXa": "Xã A Lưới 1"
            },
            {
                "maXa": "41115036",
                "tenXa": "Xã A Lưới 2"
            },
            {
                "maXa": "41115037",
                "tenXa": "Xã A Lưới 3"
            },
            {
                "maXa": "41115038",
                "tenXa": "Xã A Lưới 4"
            },
            {
                "maXa": "41115039",
                "tenXa": "Xã A Lưới 5"
            },
            {
                "maXa": "41107034",
                "tenXa": "Xã Bình Điền"
            },
            {
                "maXa": "41113030",
                "tenXa": "Xã Chân Mây – Lăng Cô"
            },
            {
                "maXa": "41113027",
                "tenXa": "Xã Hưng Lộc"
            },
            {
                "maXa": "41113033",
                "tenXa": "Xã Khe Tre"
            },
            {
                "maXa": "41113031",
                "tenXa": "Xã Long Quảng"
            },
            {
                "maXa": "41113028",
                "tenXa": "Xã Lộc An"
            },
            {
                "maXa": "41113032",
                "tenXa": "Xã Nam Đông"
            },
            {
                "maXa": "41109024",
                "tenXa": "Xã Phú Hồ"
            },
            {
                "maXa": "41113029",
                "tenXa": "Xã Phú Lộc"
            },
            {
                "maXa": "41109025",
                "tenXa": "Xã Phú Vang"
            },
            {
                "maXa": "41109023",
                "tenXa": "Xã Phú Vinh"
            },
            {
                "maXa": "41105022",
                "tenXa": "Xã Quảng Điền"
            },
            {
                "maXa": "41113026",
                "tenXa": "Xã Vinh Lộc"
            },
            {
                "maXa": "41105021",
                "tenXa": "Xã Đan Điền"
            }
        ]
    },
    {
        "maThanhPho": "01",
        "thanhPho": "Thành phố Hà Nội",
        "xaPhuong": [
            {
                "maXa": "10101003",
                "tenXa": "Phường Ba Đình"
            },
            {
                "maXa": "10107008",
                "tenXa": "Phường Bạch Mai"
            },
            {
                "maXa": "10106040",
                "tenXa": "Phường Bồ Đề"
            },
            {
                "maXa": "10153073",
                "tenXa": "Phường Chương Mỹ"
            },
            {
                "maXa": "10113025",
                "tenXa": "Phường Cầu Giấy"
            },
            {
                "maXa": "10105002",
                "tenXa": "Phường Cửa Nam"
            },
            {
                "maXa": "10127044",
                "tenXa": "Phường Dương Nội"
            },
            {
                "maXa": "10101005",
                "tenXa": "Phường Giảng Võ"
            },
            {
                "maXa": "10107006",
                "tenXa": "Phường Hai Bà Trưng"
            },
            {
                "maXa": "10105001",
                "tenXa": "Phường Hoàn Kiếm"
            },
            {
                "maXa": "10123020",
                "tenXa": "Phường Hoàng Liệt"
            },
            {
                "maXa": "10108016",
                "tenXa": "Phường Hoàng Mai"
            },
            {
                "maXa": "10127043",
                "tenXa": "Phường Hà Đông"
            },
            {
                "maXa": "10103014",
                "tenXa": "Phường Hồng Hà"
            },
            {
                "maXa": "10111023",
                "tenXa": "Phường Khương Đình"
            },
            {
                "maXa": "10109010",
                "tenXa": "Phường Kim Liên"
            },
            {
                "maXa": "10127047",
                "tenXa": "Phường Kiến Hưng"
            },
            {
                "maXa": "10106039",
                "tenXa": "Phường Long Biên"
            },
            {
                "maXa": "10109012",
                "tenXa": "Phường Láng"
            },
            {
                "maXa": "10108015",
                "tenXa": "Phường Lĩnh Nam"
            },
            {
                "maXa": "10113026",
                "tenXa": "Phường Nghĩa Đô"
            },
            {
                "maXa": "10101004",
                "tenXa": "Phường Ngọc Hà"
            },
            {
                "maXa": "10157031",
                "tenXa": "Phường Phú Diễn"
            },
            {
                "maXa": "10127046",
                "tenXa": "Phường Phú Lương"
            },
            {
                "maXa": "10157029",
                "tenXa": "Phường Phú Thượng"
            },
            {
                "maXa": "10106042",
                "tenXa": "Phường Phúc Lợi"
            },
            {
                "maXa": "10111024",
                "tenXa": "Phường Phương Liệt"
            },
            {
                "maXa": "10129087",
                "tenXa": "Phường Sơn Tây"
            },
            {
                "maXa": "10123052",
                "tenXa": "Phường Thanh Liệt"
            },
            {
                "maXa": "10111022",
                "tenXa": "Phường Thanh Xuân"
            },
            {
                "maXa": "10157034",
                "tenXa": "Phường Thượng Cát"
            },
            {
                "maXa": "10103028",
                "tenXa": "Phường Tây Hồ"
            },
            {
                "maXa": "10155037",
                "tenXa": "Phường Tây Mỗ"
            },
            {
                "maXa": "10157030",
                "tenXa": "Phường Tây Tựu"
            },
            {
                "maXa": "10129088",
                "tenXa": "Phường Tùng Thiện"
            },
            {
                "maXa": "10108018",
                "tenXa": "Phường Tương Mai"
            },
            {
                "maXa": "10155035",
                "tenXa": "Phường Từ Liêm"
            },
            {
                "maXa": "10106041",
                "tenXa": "Phường Việt Hưng"
            },
            {
                "maXa": "10109011",
                "tenXa": "Phường Văn Miếu - Quốc Tử Giám"
            },
            {
                "maXa": "10108017",
                "tenXa": "Phường Vĩnh Hưng"
            },
            {
                "maXa": "10107007",
                "tenXa": "Phường Vĩnh Tuy"
            },
            {
                "maXa": "10155036",
                "tenXa": "Phường Xuân Phương"
            },
            {
                "maXa": "10157032",
                "tenXa": "Phường Xuân Đỉnh"
            },
            {
                "maXa": "10113027",
                "tenXa": "Phường Yên Hoà"
            },
            {
                "maXa": "10127045",
                "tenXa": "Phường Yên Nghĩa"
            },
            {
                "maXa": "10108021",
                "tenXa": "Phường Yên Sở"
            },
            {
                "maXa": "10109013",
                "tenXa": "Phường Ô Chợ Dừa"
            },
            {
                "maXa": "10157033",
                "tenXa": "Phường Đông Ngạc"
            },
            {
                "maXa": "10155038",
                "tenXa": "Phường Đại Mỗ"
            },
            {
                "maXa": "10108019",
                "tenXa": "Phường Định Công"
            },
            {
                "maXa": "10109009",
                "tenXa": "Phường Đống Đa"
            },
            {
                "maXa": "10137105",
                "tenXa": "Xã An Khánh"
            },
            {
                "maXa": "10151085",
                "tenXa": "Xã Ba Vì"
            },
            {
                "maXa": "10119111",
                "tenXa": "Xã Bát Tràng"
            },
            {
                "maXa": "10141062",
                "tenXa": "Xã Bình Minh"
            },
            {
                "maXa": "10151083",
                "tenXa": "Xã Bất Bạt"
            },
            {
                "maXa": "10149059",
                "tenXa": "Xã Chuyên Mỹ"
            },
            {
                "maXa": "10143055",
                "tenXa": "Xã Chương Dương"
            },
            {
                "maXa": "10151082",
                "tenXa": "Xã Cổ Đô"
            },
            {
                "maXa": "10141064",
                "tenXa": "Xã Dân Hoà"
            },
            {
                "maXa": "10137103",
                "tenXa": "Xã Dương Hoà"
            },
            {
                "maXa": "10119109",
                "tenXa": "Xã Gia Lâm"
            },
            {
                "maXa": "10135096",
                "tenXa": "Xã Hoà Lạc"
            },
            {
                "maXa": "10153077",
                "tenXa": "Xã Hoà Phú"
            },
            {
                "maXa": "10147067",
                "tenXa": "Xã Hoà Xá"
            },
            {
                "maXa": "10137102",
                "tenXa": "Xã Hoài Đức"
            },
            {
                "maXa": "10131092",
                "tenXa": "Xã Hát Môn"
            },
            {
                "maXa": "10139099",
                "tenXa": "Xã Hưng Đạo"
            },
            {
                "maXa": "10145072",
                "tenXa": "Xã Hương Sơn"
            },
            {
                "maXa": "10135094",
                "tenXa": "Xã Hạ Bằng"
            },
            {
                "maXa": "10145070",
                "tenXa": "Xã Hồng Sơn"
            },
            {
                "maXa": "10143056",
                "tenXa": "Xã Hồng Vân"
            },
            {
                "maXa": "10115126",
                "tenXa": "Xã Kim Anh"
            },
            {
                "maXa": "10139100",
                "tenXa": "Xã Kiều Phú"
            },
            {
                "maXa": "10133108",
                "tenXa": "Xã Liên Minh"
            },
            {
                "maXa": "10151079",
                "tenXa": "Xã Minh Châu"
            },
            {
                "maXa": "10125118",
                "tenXa": "Xã Mê Linh"
            },
            {
                "maXa": "10145069",
                "tenXa": "Xã Mỹ Đức"
            },
            {
                "maXa": "10123050",
                "tenXa": "Xã Nam Phù"
            },
            {
                "maXa": "10123051",
                "tenXa": "Xã Ngọc Hồi"
            },
            {
                "maXa": "10115124",
                "tenXa": "Xã Nội Bài"
            },
            {
                "maXa": "10119112",
                "tenXa": "Xã Phù Đổng"
            },
            {
                "maXa": "10139101",
                "tenXa": "Xã Phú Cát"
            },
            {
                "maXa": "10153074",
                "tenXa": "Xã Phú Nghĩa"
            },
            {
                "maXa": "10149057",
                "tenXa": "Xã Phú Xuyên"
            },
            {
                "maXa": "10131091",
                "tenXa": "Xã Phúc Lộc"
            },
            {
                "maXa": "10145071",
                "tenXa": "Xã Phúc Sơn"
            },
            {
                "maXa": "10117115",
                "tenXa": "Xã Phúc Thịnh"
            },
            {
                "maXa": "10131090",
                "tenXa": "Xã Phúc Thọ"
            },
            {
                "maXa": "10149058",
                "tenXa": "Xã Phượng Dực"
            },
            {
                "maXa": "10125121",
                "tenXa": "Xã Quang Minh"
            },
            {
                "maXa": "10153078",
                "tenXa": "Xã Quảng Bị"
            },
            {
                "maXa": "10151080",
                "tenXa": "Xã Quảng Oai"
            },
            {
                "maXa": "10139098",
                "tenXa": "Xã Quốc Oai"
            },
            {
                "maXa": "10151084",
                "tenXa": "Xã Suối Hai"
            },
            {
                "maXa": "10115122",
                "tenXa": "Xã Sóc Sơn"
            },
            {
                "maXa": "10137104",
                "tenXa": "Xã Sơn Đồng"
            },
            {
                "maXa": "10141063",
                "tenXa": "Xã Tam Hưng"
            },
            {
                "maXa": "10141061",
                "tenXa": "Xã Thanh Oai"
            },
            {
                "maXa": "10123048",
                "tenXa": "Xã Thanh Trì"
            },
            {
                "maXa": "10117116",
                "tenXa": "Xã Thiên Lộc"
            },
            {
                "maXa": "10119110",
                "tenXa": "Xã Thuận An"
            },
            {
                "maXa": "10117113",
                "tenXa": "Xã Thư Lâm"
            },
            {
                "maXa": "10143054",
                "tenXa": "Xã Thường Tín"
            },
            {
                "maXa": "10143053",
                "tenXa": "Xã Thượng Phúc"
            },
            {
                "maXa": "10135093",
                "tenXa": "Xã Thạch Thất"
            },
            {
                "maXa": "10125120",
                "tenXa": "Xã Tiến Thắng"
            },
            {
                "maXa": "10115125",
                "tenXa": "Xã Trung Giã"
            },
            {
                "maXa": "10153076",
                "tenXa": "Xã Trần Phú"
            },
            {
                "maXa": "10135095",
                "tenXa": "Xã Tây Phương"
            },
            {
                "maXa": "10147065",
                "tenXa": "Xã Vân Đình"
            },
            {
                "maXa": "10117117",
                "tenXa": "Xã Vĩnh Thanh"
            },
            {
                "maXa": "10151081",
                "tenXa": "Xã Vật Lại"
            },
            {
                "maXa": "10153075",
                "tenXa": "Xã Xuân Mai"
            },
            {
                "maXa": "10151086",
                "tenXa": "Xã Yên Bài"
            },
            {
                "maXa": "10125119",
                "tenXa": "Xã Yên Lãng"
            },
            {
                "maXa": "10135097",
                "tenXa": "Xã Yên Xuân"
            },
            {
                "maXa": "10133107",
                "tenXa": "Xã Ô Diên"
            },
            {
                "maXa": "10115123",
                "tenXa": "Xã Đa Phúc"
            },
            {
                "maXa": "10133106",
                "tenXa": "Xã Đan Phượng"
            },
            {
                "maXa": "10129089",
                "tenXa": "Xã Đoài Phương"
            },
            {
                "maXa": "10117114",
                "tenXa": "Xã Đông Anh"
            },
            {
                "maXa": "10123049",
                "tenXa": "Xã Đại Thanh"
            },
            {
                "maXa": "10149060",
                "tenXa": "Xã Đại Xuyên"
            },
            {
                "maXa": "10147068",
                "tenXa": "Xã Ứng Hoà"
            },
            {
                "maXa": "10147066",
                "tenXa": "Xã Ứng Thiên"
            }
        ]
    },
    {
        "maThanhPho": "18",
        "thanhPho": "Tỉnh Hà Tĩnh",
        "xaPhuong": [
            {
                "maXa": "40503040",
                "tenXa": "Phường Bắc Hồng Lĩnh"
            },
            {
                "maXa": "40520003",
                "tenXa": "Phường Hoành Sơn"
            },
            {
                "maXa": "40501021",
                "tenXa": "Phường Hà Huy Tập"
            },
            {
                "maXa": "40520002",
                "tenXa": "Phường Hải Ninh"
            },
            {
                "maXa": "40503041",
                "tenXa": "Phường Nam Hồng Lĩnh"
            },
            {
                "maXa": "40520001",
                "tenXa": "Phường Sông Trí"
            },
            {
                "maXa": "40501019",
                "tenXa": "Phường Thành Sen"
            },
            {
                "maXa": "40501020",
                "tenXa": "Phường Trần Phú"
            },
            {
                "maXa": "40520004",
                "tenXa": "Phường Vũng Áng"
            },
            {
                "maXa": "40511034",
                "tenXa": "Xã Can Lộc"
            },
            {
                "maXa": "40501025",
                "tenXa": "Xã Cẩm Bình"
            },
            {
                "maXa": "40515014",
                "tenXa": "Xã Cẩm Duệ"
            },
            {
                "maXa": "40515015",
                "tenXa": "Xã Cẩm Hưng"
            },
            {
                "maXa": "40515016",
                "tenXa": "Xã Cẩm Lạc"
            },
            {
                "maXa": "40515017",
                "tenXa": "Xã Cẩm Trung"
            },
            {
                "maXa": "40515012",
                "tenXa": "Xã Cẩm Xuyên"
            },
            {
                "maXa": "40505044",
                "tenXa": "Xã Cổ Đạm"
            },
            {
                "maXa": "40511036",
                "tenXa": "Xã Gia Hanh"
            },
            {
                "maXa": "40517064",
                "tenXa": "Xã Hà Linh"
            },
            {
                "maXa": "40517065",
                "tenXa": "Xã Hương Bình"
            },
            {
                "maXa": "40517061",
                "tenXa": "Xã Hương Khê"
            },
            {
                "maXa": "40517062",
                "tenXa": "Xã Hương Phố"
            },
            {
                "maXa": "40509051",
                "tenXa": "Xã Hương Sơn"
            },
            {
                "maXa": "40517067",
                "tenXa": "Xã Hương Xuân"
            },
            {
                "maXa": "40517063",
                "tenXa": "Xã Hương Đô"
            },
            {
                "maXa": "40513032",
                "tenXa": "Xã Hồng Lộc"
            },
            {
                "maXa": "40509057",
                "tenXa": "Xã Kim Hoa"
            },
            {
                "maXa": "40519006",
                "tenXa": "Xã Kỳ Anh"
            },
            {
                "maXa": "40519007",
                "tenXa": "Xã Kỳ Hoa"
            },
            {
                "maXa": "40519009",
                "tenXa": "Xã Kỳ Khang"
            },
            {
                "maXa": "40519010",
                "tenXa": "Xã Kỳ Lạc"
            },
            {
                "maXa": "40519011",
                "tenXa": "Xã Kỳ Thượng"
            },
            {
                "maXa": "40519008",
                "tenXa": "Xã Kỳ Văn"
            },
            {
                "maXa": "40519005",
                "tenXa": "Xã Kỳ Xuân"
            },
            {
                "maXa": "40513031",
                "tenXa": "Xã Lộc Hà"
            },
            {
                "maXa": "40521059",
                "tenXa": "Xã Mai Hoa"
            },
            {
                "maXa": "40513033",
                "tenXa": "Xã Mai Phụ"
            },
            {
                "maXa": "40505043",
                "tenXa": "Xã Nghi Xuân"
            },
            {
                "maXa": "40517066",
                "tenXa": "Xã Phúc Trạch"
            },
            {
                "maXa": "40509054",
                "tenXa": "Xã Sơn Giang"
            },
            {
                "maXa": "40509056",
                "tenXa": "Xã Sơn Hồng"
            },
            {
                "maXa": "40509068",
                "tenXa": "Xã Sơn Kim 1"
            },
            {
                "maXa": "40509069",
                "tenXa": "Xã Sơn Kim 2"
            },
            {
                "maXa": "40509055",
                "tenXa": "Xã Sơn Tiến"
            },
            {
                "maXa": "40509052",
                "tenXa": "Xã Sơn Tây"
            },
            {
                "maXa": "40515013",
                "tenXa": "Xã Thiên Cầm"
            },
            {
                "maXa": "40521060",
                "tenXa": "Xã Thượng Đức"
            },
            {
                "maXa": "40513026",
                "tenXa": "Xã Thạch Hà"
            },
            {
                "maXa": "40501024",
                "tenXa": "Xã Thạch Khê"
            },
            {
                "maXa": "40501022",
                "tenXa": "Xã Thạch Lạc"
            },
            {
                "maXa": "40513030",
                "tenXa": "Xã Thạch Xuân"
            },
            {
                "maXa": "40505042",
                "tenXa": "Xã Tiên Điền"
            },
            {
                "maXa": "40513027",
                "tenXa": "Xã Toàn Lưu"
            },
            {
                "maXa": "40511037",
                "tenXa": "Xã Trường Lưu"
            },
            {
                "maXa": "40511035",
                "tenXa": "Xã Tùng Lộc"
            },
            {
                "maXa": "40509053",
                "tenXa": "Xã Tứ Mỹ"
            },
            {
                "maXa": "40513028",
                "tenXa": "Xã Việt Xuyên"
            },
            {
                "maXa": "40521058",
                "tenXa": "Xã Vũ Quang"
            },
            {
                "maXa": "40511038",
                "tenXa": "Xã Xuân Lộc"
            },
            {
                "maXa": "40515018",
                "tenXa": "Xã Yên Hoà"
            },
            {
                "maXa": "40505045",
                "tenXa": "Xã Đan Hải"
            },
            {
                "maXa": "40513029",
                "tenXa": "Xã Đông Kinh"
            },
            {
                "maXa": "40511039",
                "tenXa": "Xã Đồng Lộc"
            },
            {
                "maXa": "40501023",
                "tenXa": "Xã Đồng Tiến"
            },
            {
                "maXa": "40507050",
                "tenXa": "Xã Đức Minh"
            },
            {
                "maXa": "40507047",
                "tenXa": "Xã Đức Quang"
            },
            {
                "maXa": "40507049",
                "tenXa": "Xã Đức Thịnh"
            },
            {
                "maXa": "40507046",
                "tenXa": "Xã Đức Thọ"
            },
            {
                "maXa": "40507048",
                "tenXa": "Xã Đức Đồng"
            }
        ]
    },
    {
        "maThanhPho": "05",
        "thanhPho": "Tỉnh Hưng Yên",
        "xaPhuong": [
            {
                "maXa": "10901003",
                "tenXa": "Phường Hồng Châu"
            },
            {
                "maXa": "10903004",
                "tenXa": "Phường Mỹ Hào"
            },
            {
                "maXa": "10901001",
                "tenXa": "Phường Phố Hiến"
            },
            {
                "maXa": "10901002",
                "tenXa": "Phường Sơn Nam"
            },
            {
                "maXa": "11501040",
                "tenXa": "Phường Thái Bình"
            },
            {
                "maXa": "10903006",
                "tenXa": "Phường Thượng Hồng"
            },
            {
                "maXa": "11501043",
                "tenXa": "Phường Trà Lý"
            },
            {
                "maXa": "11501042",
                "tenXa": "Phường Trần Hưng Đạo"
            },
            {
                "maXa": "11501041",
                "tenXa": "Phường Trần Lãm"
            },
            {
                "maXa": "11501044",
                "tenXa": "Phường Vũ Phúc"
            },
            {
                "maXa": "10903005",
                "tenXa": "Phường Đường Hào"
            },
            {
                "maXa": "11503070",
                "tenXa": "Xã A Sào"
            },
            {
                "maXa": "11513097",
                "tenXa": "Xã Bình Nguyên"
            },
            {
                "maXa": "11513094",
                "tenXa": "Xã Bình Thanh"
            },
            {
                "maXa": "11513095",
                "tenXa": "Xã Bình Định"
            },
            {
                "maXa": "11507050",
                "tenXa": "Xã Bắc Thái Ninh"
            },
            {
                "maXa": "11507047",
                "tenXa": "Xã Bắc Thụy Anh"
            },
            {
                "maXa": "11509082",
                "tenXa": "Xã Bắc Tiên Hưng"
            },
            {
                "maXa": "11509086",
                "tenXa": "Xã Bắc Đông Hưng"
            },
            {
                "maXa": "11509085",
                "tenXa": "Xã Bắc Đông Quan"
            },
            {
                "maXa": "10905028",
                "tenXa": "Xã Châu Ninh"
            },
            {
                "maXa": "10905027",
                "tenXa": "Xã Chí Minh"
            },
            {
                "maXa": "11505078",
                "tenXa": "Xã Diên Hà"
            },
            {
                "maXa": "10909017",
                "tenXa": "Xã Hiệp Cường"
            },
            {
                "maXa": "10919031",
                "tenXa": "Xã Hoàn Long"
            },
            {
                "maXa": "10913008",
                "tenXa": "Xã Hoàng Hoa Thám"
            },
            {
                "maXa": "11505073",
                "tenXa": "Xã Hưng Hà"
            },
            {
                "maXa": "11515062",
                "tenXa": "Xã Hưng Phú"
            },
            {
                "maXa": "11505076",
                "tenXa": "Xã Hồng Minh"
            },
            {
                "maXa": "10907023",
                "tenXa": "Xã Hồng Quang"
            },
            {
                "maXa": "11513096",
                "tenXa": "Xã Hồng Vũ"
            },
            {
                "maXa": "10905024",
                "tenXa": "Xã Khoái Châu"
            },
            {
                "maXa": "11513091",
                "tenXa": "Xã Kiến Xương"
            },
            {
                "maXa": "11505080",
                "tenXa": "Xã Long Hưng"
            },
            {
                "maXa": "11513090",
                "tenXa": "Xã Lê Lợi"
            },
            {
                "maXa": "11505075",
                "tenXa": "Xã Lê Quý Đôn"
            },
            {
                "maXa": "10909015",
                "tenXa": "Xã Lương Bằng"
            },
            {
                "maXa": "10917034",
                "tenXa": "Xã Lạc Đạo"
            },
            {
                "maXa": "11503065",
                "tenXa": "Xã Minh Thọ"
            },
            {
                "maXa": "10915039",
                "tenXa": "Xã Mễ Sở"
            },
            {
                "maXa": "11515061",
                "tenXa": "Xã Nam Cường"
            },
            {
                "maXa": "11507053",
                "tenXa": "Xã Nam Thái Ninh"
            },
            {
                "maXa": "11507049",
                "tenXa": "Xã Nam Thụy Anh"
            },
            {
                "maXa": "11509088",
                "tenXa": "Xã Nam Tiên Hưng"
            },
            {
                "maXa": "11515063",
                "tenXa": "Xã Nam Tiền Hải"
            },
            {
                "maXa": "11509084",
                "tenXa": "Xã Nam Đông Hưng"
            },
            {
                "maXa": "10909016",
                "tenXa": "Xã Nghĩa Dân"
            },
            {
                "maXa": "10915036",
                "tenXa": "Xã Nghĩa Trụ"
            },
            {
                "maXa": "11503066",
                "tenXa": "Xã Nguyễn Du"
            },
            {
                "maXa": "10907022",
                "tenXa": "Xã Nguyễn Trãi"
            },
            {
                "maXa": "10919032",
                "tenXa": "Xã Nguyễn Văn Linh"
            },
            {
                "maXa": "11503068",
                "tenXa": "Xã Ngọc Lâm"
            },
            {
                "maXa": "11505079",
                "tenXa": "Xã Ngự Thiên"
            },
            {
                "maXa": "10917033",
                "tenXa": "Xã Như Quỳnh"
            },
            {
                "maXa": "10907021",
                "tenXa": "Xã Phạm Ngũ Lão"
            },
            {
                "maXa": "11503071",
                "tenXa": "Xã Phụ Dực"
            },
            {
                "maXa": "10915037",
                "tenXa": "Xã Phụng Công"
            },
            {
                "maXa": "10911011",
                "tenXa": "Xã Quang Hưng"
            },
            {
                "maXa": "11513092",
                "tenXa": "Xã Quang Lịch"
            },
            {
                "maXa": "11503067",
                "tenXa": "Xã Quỳnh An"
            },
            {
                "maXa": "11503064",
                "tenXa": "Xã Quỳnh Phụ"
            },
            {
                "maXa": "11507051",
                "tenXa": "Xã Thái Ninh"
            },
            {
                "maXa": "11507045",
                "tenXa": "Xã Thái Thụy"
            },
            {
                "maXa": "11511100",
                "tenXa": "Xã Thư Trì"
            },
            {
                "maXa": "11511102",
                "tenXa": "Xã Thư Vũ"
            },
            {
                "maXa": "11505077",
                "tenXa": "Xã Thần Khê"
            },
            {
                "maXa": "11507048",
                "tenXa": "Xã Thụy Anh"
            },
            {
                "maXa": "10913010",
                "tenXa": "Xã Tiên Hoa"
            },
            {
                "maXa": "11509089",
                "tenXa": "Xã Tiên Hưng"
            },
            {
                "maXa": "11505074",
                "tenXa": "Xã Tiên La"
            },
            {
                "maXa": "10913009",
                "tenXa": "Xã Tiên Lữ"
            },
            {
                "maXa": "10911013",
                "tenXa": "Xã Tiên Tiến"
            },
            {
                "maXa": "11515056",
                "tenXa": "Xã Tiền Hải"
            },
            {
                "maXa": "10905025",
                "tenXa": "Xã Triệu Việt Vương"
            },
            {
                "maXa": "11513098",
                "tenXa": "Xã Trà Giang"
            },
            {
                "maXa": "10901007",
                "tenXa": "Xã Tân Hưng"
            },
            {
                "maXa": "11511101",
                "tenXa": "Xã Tân Thuận"
            },
            {
                "maXa": "11503072",
                "tenXa": "Xã Tân Tiến"
            },
            {
                "maXa": "11507054",
                "tenXa": "Xã Tây Thái Ninh"
            },
            {
                "maXa": "11507055",
                "tenXa": "Xã Tây Thụy Anh"
            },
            {
                "maXa": "11515057",
                "tenXa": "Xã Tây Tiền Hải"
            },
            {
                "maXa": "10911014",
                "tenXa": "Xã Tống Trân"
            },
            {
                "maXa": "10905026",
                "tenXa": "Xã Việt Tiến"
            },
            {
                "maXa": "10919030",
                "tenXa": "Xã Việt Yên"
            },
            {
                "maXa": "10915038",
                "tenXa": "Xã Văn Giang"
            },
            {
                "maXa": "11513093",
                "tenXa": "Xã Vũ Quý"
            },
            {
                "maXa": "11511099",
                "tenXa": "Xã Vũ Thư"
            },
            {
                "maXa": "11511103",
                "tenXa": "Xã Vũ Tiên"
            },
            {
                "maXa": "11511104",
                "tenXa": "Xã Vạn Xuân"
            },
            {
                "maXa": "10907020",
                "tenXa": "Xã Xuân Trúc"
            },
            {
                "maXa": "10919029",
                "tenXa": "Xã Yên Mỹ"
            },
            {
                "maXa": "11515058",
                "tenXa": "Xã Ái Quốc"
            },
            {
                "maXa": "10907019",
                "tenXa": "Xã Ân Thi"
            },
            {
                "maXa": "10911012",
                "tenXa": "Xã Đoàn Đào"
            },
            {
                "maXa": "11509081",
                "tenXa": "Xã Đông Hưng"
            },
            {
                "maXa": "11509087",
                "tenXa": "Xã Đông Quan"
            },
            {
                "maXa": "11507052",
                "tenXa": "Xã Đông Thái Ninh"
            },
            {
                "maXa": "11507046",
                "tenXa": "Xã Đông Thụy Anh"
            },
            {
                "maXa": "11509083",
                "tenXa": "Xã Đông Tiên Hưng"
            },
            {
                "maXa": "11515060",
                "tenXa": "Xã Đông Tiền Hải"
            },
            {
                "maXa": "10917035",
                "tenXa": "Xã Đại Đồng"
            },
            {
                "maXa": "11503069",
                "tenXa": "Xã Đồng Bằng"
            },
            {
                "maXa": "11515059",
                "tenXa": "Xã Đồng Châu"
            },
            {
                "maXa": "10909018",
                "tenXa": "Xã Đức Hợp"
            }
        ]
    },
    {
        "maThanhPho": "04",
        "thanhPho": "Thành phố Hải Phòng",
        "xaPhuong": [
            {
                "maXa": "10305013",
                "tenXa": "Phường An Biên"
            },
            {
                "maXa": "10313022",
                "tenXa": "Phường An Dương"
            },
            {
                "maXa": "10313023",
                "tenXa": "Phường An Hải"
            },
            {
                "maXa": "10313024",
                "tenXa": "Phường An Phong"
            },
            {
                "maXa": "10311005",
                "tenXa": "Phường Bạch Đằng"
            },
            {
                "maXa": "10709069",
                "tenXa": "Phường Bắc An Phụ"
            },
            {
                "maXa": "10703060",
                "tenXa": "Phường Chu Văn An"
            },
            {
                "maXa": "10703061",
                "tenXa": "Phường Chí Linh"
            },
            {
                "maXa": "10327021",
                "tenXa": "Phường Dương Kinh"
            },
            {
                "maXa": "10303011",
                "tenXa": "Phường Gia Viên"
            },
            {
                "maXa": "10311003",
                "tenXa": "Phường Hoà Bình"
            },
            {
                "maXa": "10327020",
                "tenXa": "Phường Hưng Đạo"
            },
            {
                "maXa": "10304014",
                "tenXa": "Phường Hải An"
            },
            {
                "maXa": "10701051",
                "tenXa": "Phường Hải Dương"
            },
            {
                "maXa": "10301009",
                "tenXa": "Phường Hồng An"
            },
            {
                "maXa": "10301008",
                "tenXa": "Phường Hồng Bàng"
            },
            {
                "maXa": "10709066",
                "tenXa": "Phường Kinh Môn"
            },
            {
                "maXa": "10307016",
                "tenXa": "Phường Kiến An"
            },
            {
                "maXa": "10305012",
                "tenXa": "Phường Lê Chân"
            },
            {
                "maXa": "10701052",
                "tenXa": "Phường Lê Thanh Nghị"
            },
            {
                "maXa": "10311007",
                "tenXa": "Phường Lê Ích Mộc"
            },
            {
                "maXa": "10703065",
                "tenXa": "Phường Lê Đại Hành"
            },
            {
                "maXa": "10311006",
                "tenXa": "Phường Lưu Kiếm"
            },
            {
                "maXa": "10311004",
                "tenXa": "Phường Nam Triệu"
            },
            {
                "maXa": "10309018",
                "tenXa": "Phường Nam Đồ Sơn"
            },
            {
                "maXa": "10701055",
                "tenXa": "Phường Nam Đồng"
            },
            {
                "maXa": "10703063",
                "tenXa": "Phường Nguyễn Trãi"
            },
            {
                "maXa": "10709067",
                "tenXa": "Phường Nguyễn Đại Năng"
            },
            {
                "maXa": "10303010",
                "tenXa": "Phường Ngô Quyền"
            },
            {
                "maXa": "10709071",
                "tenXa": "Phường Nhị Chiểu"
            },
            {
                "maXa": "10307017",
                "tenXa": "Phường Phù Liễn"
            },
            {
                "maXa": "10709070",
                "tenXa": "Phường Phạm Sư Mạnh"
            },
            {
                "maXa": "10311002",
                "tenXa": "Phường Thiên Hương"
            },
            {
                "maXa": "10311001",
                "tenXa": "Phường Thuỷ Nguyên"
            },
            {
                "maXa": "10701054",
                "tenXa": "Phường Thành Đông"
            },
            {
                "maXa": "10701057",
                "tenXa": "Phường Thạch Khôi"
            },
            {
                "maXa": "10703062",
                "tenXa": "Phường Trần Hưng Đạo"
            },
            {
                "maXa": "10709068",
                "tenXa": "Phường Trần Liễu"
            },
            {
                "maXa": "10703064",
                "tenXa": "Phường Trần Nhân Tông"
            },
            {
                "maXa": "10701056",
                "tenXa": "Phường Tân Hưng"
            },
            {
                "maXa": "10717058",
                "tenXa": "Phường Tứ Minh"
            },
            {
                "maXa": "10701053",
                "tenXa": "Phường Việt Hoà"
            },
            {
                "maXa": "10701059",
                "tenXa": "Phường Ái Quốc"
            },
            {
                "maXa": "10304015",
                "tenXa": "Phường Đông Hải"
            },
            {
                "maXa": "10309019",
                "tenXa": "Phường Đồ Sơn"
            },
            {
                "maXa": "10315025",
                "tenXa": "Xã An Hưng"
            },
            {
                "maXa": "10315026",
                "tenXa": "Xã An Khánh"
            },
            {
                "maXa": "10315029",
                "tenXa": "Xã An Lão"
            },
            {
                "maXa": "10705077",
                "tenXa": "Xã An Phú"
            },
            {
                "maXa": "10315027",
                "tenXa": "Xã An Quang"
            },
            {
                "maXa": "10711113",
                "tenXa": "Xã An Thành"
            },
            {
                "maXa": "10315028",
                "tenXa": "Xã An Trường"
            },
            {
                "maXa": "10719088",
                "tenXa": "Xã Bình Giang"
            },
            {
                "maXa": "10721107",
                "tenXa": "Xã Bắc Thanh Miện"
            },
            {
                "maXa": "10715098",
                "tenXa": "Xã Chí Minh"
            },
            {
                "maXa": "10319039",
                "tenXa": "Xã Chấn Hưng"
            },
            {
                "maXa": "10717083",
                "tenXa": "Xã Cẩm Giang"
            },
            {
                "maXa": "10717086",
                "tenXa": "Xã Cẩm Giàng"
            },
            {
                "maXa": "10713091",
                "tenXa": "Xã Gia Lộc"
            },
            {
                "maXa": "10713093",
                "tenXa": "Xã Gia Phúc"
            },
            {
                "maXa": "10707080",
                "tenXa": "Xã Hà Bắc"
            },
            {
                "maXa": "10707081",
                "tenXa": "Xã Hà Nam"
            },
            {
                "maXa": "10707079",
                "tenXa": "Xã Hà Tây"
            },
            {
                "maXa": "10707082",
                "tenXa": "Xã Hà Đông"
            },
            {
                "maXa": "10319040",
                "tenXa": "Xã Hùng Thắng"
            },
            {
                "maXa": "10721108",
                "tenXa": "Xã Hải Hưng"
            },
            {
                "maXa": "10723105",
                "tenXa": "Xã Hồng Châu"
            },
            {
                "maXa": "10705075",
                "tenXa": "Xã Hợp Tiến"
            },
            {
                "maXa": "10723103",
                "tenXa": "Xã Khúc Thừa Dụ"
            },
            {
                "maXa": "10711114",
                "tenXa": "Xã Kim Thành"
            },
            {
                "maXa": "10317033",
                "tenXa": "Xã Kiến Hưng"
            },
            {
                "maXa": "10317032",
                "tenXa": "Xã Kiến Hải"
            },
            {
                "maXa": "10317031",
                "tenXa": "Xã Kiến Minh"
            },
            {
                "maXa": "10317030",
                "tenXa": "Xã Kiến Thụy"
            },
            {
                "maXa": "10719087",
                "tenXa": "Xã Kẻ Sặt"
            },
            {
                "maXa": "10711112",
                "tenXa": "Xã Lai Khê"
            },
            {
                "maXa": "10715099",
                "tenXa": "Xã Lạc Phượng"
            },
            {
                "maXa": "10717085",
                "tenXa": "Xã Mao Điền"
            },
            {
                "maXa": "10709072",
                "tenXa": "Xã Nam An Phụ"
            },
            {
                "maXa": "10705073",
                "tenXa": "Xã Nam Sách"
            },
            {
                "maXa": "10721110",
                "tenXa": "Xã Nam Thanh Miện"
            },
            {
                "maXa": "10317034",
                "tenXa": "Xã Nghi Dương"
            },
            {
                "maXa": "10715100",
                "tenXa": "Xã Nguyên Giáp"
            },
            {
                "maXa": "10321042",
                "tenXa": "Xã Nguyễn Bỉnh Khiêm"
            },
            {
                "maXa": "10721109",
                "tenXa": "Xã Nguyễn Lương Bằng"
            },
            {
                "maXa": "10723101",
                "tenXa": "Xã Ninh Giang"
            },
            {
                "maXa": "10711111",
                "tenXa": "Xã Phú Thái"
            },
            {
                "maXa": "10319035",
                "tenXa": "Xã Quyết Thắng"
            },
            {
                "maXa": "10707078",
                "tenXa": "Xã Thanh Hà"
            },
            {
                "maXa": "10721106",
                "tenXa": "Xã Thanh Miện"
            },
            {
                "maXa": "10705074",
                "tenXa": "Xã Thái Tân"
            },
            {
                "maXa": "10719090",
                "tenXa": "Xã Thượng Hồng"
            },
            {
                "maXa": "10319036",
                "tenXa": "Xã Tiên Lãng"
            },
            {
                "maXa": "10319038",
                "tenXa": "Xã Tiên Minh"
            },
            {
                "maXa": "10713094",
                "tenXa": "Xã Trường Tân"
            },
            {
                "maXa": "10705076",
                "tenXa": "Xã Trần Phú"
            },
            {
                "maXa": "10717084",
                "tenXa": "Xã Tuệ Tĩnh"
            },
            {
                "maXa": "10723104",
                "tenXa": "Xã Tân An"
            },
            {
                "maXa": "10715096",
                "tenXa": "Xã Tân Kỳ"
            },
            {
                "maXa": "10319037",
                "tenXa": "Xã Tân Minh"
            },
            {
                "maXa": "10715095",
                "tenXa": "Xã Tứ Kỳ"
            },
            {
                "maXa": "10311048",
                "tenXa": "Xã Việt Khê"
            },
            {
                "maXa": "10321043",
                "tenXa": "Xã Vĩnh Am"
            },
            {
                "maXa": "10321041",
                "tenXa": "Xã Vĩnh Bảo"
            },
            {
                "maXa": "10321045",
                "tenXa": "Xã Vĩnh Hoà"
            },
            {
                "maXa": "10321044",
                "tenXa": "Xã Vĩnh Hải"
            },
            {
                "maXa": "10723102",
                "tenXa": "Xã Vĩnh Lại"
            },
            {
                "maXa": "10321047",
                "tenXa": "Xã Vĩnh Thuận"
            },
            {
                "maXa": "10321046",
                "tenXa": "Xã Vĩnh Thịnh"
            },
            {
                "maXa": "10713092",
                "tenXa": "Xã Yết Kiêu"
            },
            {
                "maXa": "10719089",
                "tenXa": "Xã Đường An"
            },
            {
                "maXa": "10715097",
                "tenXa": "Xã Đại Sơn"
            },
            {
                "maXa": "10325050",
                "tenXa": "Đặc khu Bạch Long Vĩ"
            },
            {
                "maXa": "10323049",
                "tenXa": "Đặc khu Cát Hải"
            }
        ]
    },
    {
        "maThanhPho": "29",
        "thanhPho": "Thành phố Hồ Chí Minh",
        "xaPhuong": [
            {
                "maXa": "70125114",
                "tenXa": "Phường An Hội Tây"
            },
            {
                "maXa": "70125112",
                "tenXa": "Phường An Hội Đông"
            },
            {
                "maXa": "70145140",
                "tenXa": "Phường An Khánh"
            },
            {
                "maXa": "70134099",
                "tenXa": "Phường An Lạc"
            },
            {
                "maXa": "70125110",
                "tenXa": "Phường An Nhơn"
            },
            {
                "maXa": "71107035",
                "tenXa": "Phường An Phú"
            },
            {
                "maXa": "70123098",
                "tenXa": "Phường An Phú Đông"
            },
            {
                "maXa": "70109074",
                "tenXa": "Phường An Đông"
            },
            {
                "maXa": "71703005",
                "tenXa": "Phường Bà Rịa"
            },
            {
                "maXa": "70105067",
                "tenXa": "Phường Bàn Cờ"
            },
            {
                "maXa": "71105041",
                "tenXa": "Phường Bình Cơ"
            },
            {
                "maXa": "71101036",
                "tenXa": "Phường Bình Dương"
            },
            {
                "maXa": "71107033",
                "tenXa": "Phường Bình Hoà"
            },
            {
                "maXa": "70134103",
                "tenXa": "Phường Bình Hưng Hoà"
            },
            {
                "maXa": "70129106",
                "tenXa": "Phường Bình Lợi Trung"
            },
            {
                "maXa": "70111078",
                "tenXa": "Phường Bình Phú"
            },
            {
                "maXa": "70129108",
                "tenXa": "Phường Bình Quới"
            },
            {
                "maXa": "70129105",
                "tenXa": "Phường Bình Thạnh"
            },
            {
                "maXa": "70121091",
                "tenXa": "Phường Bình Thới"
            },
            {
                "maXa": "70111077",
                "tenXa": "Phường Bình Tiên"
            },
            {
                "maXa": "70145138",
                "tenXa": "Phường Bình Trưng"
            },
            {
                "maXa": "70134102",
                "tenXa": "Phường Bình Trị Đông"
            },
            {
                "maXa": "70134101",
                "tenXa": "Phường Bình Tân"
            },
            {
                "maXa": "70111076",
                "tenXa": "Phường Bình Tây"
            },
            {
                "maXa": "70115086",
                "tenXa": "Phường Bình Đông"
            },
            {
                "maXa": "70127121",
                "tenXa": "Phường Bảy Hiền"
            },
            {
                "maXa": "71115049",
                "tenXa": "Phường Bến Cát"
            },
            {
                "maXa": "70101065",
                "tenXa": "Phường Bến Thành"
            },
            {
                "maXa": "71101037",
                "tenXa": "Phường Chánh Hiệp"
            },
            {
                "maXa": "70115084",
                "tenXa": "Phường Chánh Hưng"
            },
            {
                "maXa": "71115050",
                "tenXa": "Phường Chánh Phú Hoà"
            },
            {
                "maXa": "70109075",
                "tenXa": "Phường Chợ Lớn"
            },
            {
                "maXa": "70109073",
                "tenXa": "Phường Chợ Quán"
            },
            {
                "maXa": "70145137",
                "tenXa": "Phường Cát Lái"
            },
            {
                "maXa": "70131116",
                "tenXa": "Phường Cầu Kiệu"
            },
            {
                "maXa": "70101066",
                "tenXa": "Phường Cầu Ông Lãnh"
            },
            {
                "maXa": "70119087",
                "tenXa": "Phường Diên Hồng"
            },
            {
                "maXa": "71109029",
                "tenXa": "Phường Dĩ An"
            },
            {
                "maXa": "70129104",
                "tenXa": "Phường Gia Định"
            },
            {
                "maXa": "70125111",
                "tenXa": "Phường Gò Vấp"
            },
            {
                "maXa": "70145129",
                "tenXa": "Phường Hiệp Bình"
            },
            {
                "maXa": "70121092",
                "tenXa": "Phường Hoà Bình"
            },
            {
                "maXa": "70119089",
                "tenXa": "Phường Hoà Hưng"
            },
            {
                "maXa": "71103045",
                "tenXa": "Phường Hoà Lợi"
            },
            {
                "maXa": "70125109",
                "tenXa": "Phường Hạnh Thông"
            },
            {
                "maXa": "70107071",
                "tenXa": "Phường Khánh Hội"
            },
            {
                "maXa": "70145132",
                "tenXa": "Phường Linh Xuân"
            },
            {
                "maXa": "70145134",
                "tenXa": "Phường Long Bình"
            },
            {
                "maXa": "71703006",
                "tenXa": "Phường Long Hương"
            },
            {
                "maXa": "71115048",
                "tenXa": "Phường Long Nguyên"
            },
            {
                "maXa": "70145135",
                "tenXa": "Phường Long Phước"
            },
            {
                "maXa": "70145136",
                "tenXa": "Phường Long Trường"
            },
            {
                "maXa": "71107034",
                "tenXa": "Phường Lái Thiêu"
            },
            {
                "maXa": "70121090",
                "tenXa": "Phường Minh Phụng"
            },
            {
                "maXa": "70105069",
                "tenXa": "Phường Nhiêu Lộc"
            },
            {
                "maXa": "71101046",
                "tenXa": "Phường Phú An"
            },
            {
                "maXa": "70111079",
                "tenXa": "Phường Phú Lâm"
            },
            {
                "maXa": "71101039",
                "tenXa": "Phường Phú Lợi"
            },
            {
                "maXa": "71709007",
                "tenXa": "Phường Phú Mỹ"
            },
            {
                "maXa": "70131117",
                "tenXa": "Phường Phú Nhuận"
            },
            {
                "maXa": "70113081",
                "tenXa": "Phường Phú Thuận"
            },
            {
                "maXa": "70128128",
                "tenXa": "Phường Phú Thạnh"
            },
            {
                "maXa": "70121093",
                "tenXa": "Phường Phú Thọ"
            },
            {
                "maXa": "70128126",
                "tenXa": "Phường Phú Thọ Hoà"
            },
            {
                "maXa": "70115085",
                "tenXa": "Phường Phú Định"
            },
            {
                "maXa": "70145139",
                "tenXa": "Phường Phước Long"
            },
            {
                "maXa": "71701004",
                "tenXa": "Phường Phước Thắng"
            },
            {
                "maXa": "71701003",
                "tenXa": "Phường Rạch Dừa"
            },
            {
                "maXa": "70101063",
                "tenXa": "Phường Sài Gòn"
            },
            {
                "maXa": "70145131",
                "tenXa": "Phường Tam Bình"
            },
            {
                "maXa": "71703008",
                "tenXa": "Phường Tam Long"
            },
            {
                "maXa": "71701002",
                "tenXa": "Phường Tam Thắng"
            },
            {
                "maXa": "71107031",
                "tenXa": "Phường Thuận An"
            },
            {
                "maXa": "71107032",
                "tenXa": "Phường Thuận Giao"
            },
            {
                "maXa": "70125113",
                "tenXa": "Phường Thông Tây Hội"
            },
            {
                "maXa": "70129107",
                "tenXa": "Phường Thạnh Mỹ Tây"
            },
            {
                "maXa": "70123097",
                "tenXa": "Phường Thới An"
            },
            {
                "maXa": "71103167",
                "tenXa": "Phường Thới Hoà"
            },
            {
                "maXa": "71101038",
                "tenXa": "Phường Thủ Dầu Một"
            },
            {
                "maXa": "70145130",
                "tenXa": "Phường Thủ Đức"
            },
            {
                "maXa": "70123095",
                "tenXa": "Phường Trung Mỹ Tây"
            },
            {
                "maXa": "70127122",
                "tenXa": "Phường Tân Bình"
            },
            {
                "maXa": "71105043",
                "tenXa": "Phường Tân Hiệp"
            },
            {
                "maXa": "70127120",
                "tenXa": "Phường Tân Hoà"
            },
            {
                "maXa": "70113083",
                "tenXa": "Phường Tân Hưng"
            },
            {
                "maXa": "71709011",
                "tenXa": "Phường Tân Hải"
            },
            {
                "maXa": "71105044",
                "tenXa": "Phường Tân Khánh"
            },
            {
                "maXa": "70113082",
                "tenXa": "Phường Tân Mỹ"
            },
            {
                "maXa": "70128127",
                "tenXa": "Phường Tân Phú"
            },
            {
                "maXa": "71709010",
                "tenXa": "Phường Tân Phước"
            },
            {
                "maXa": "70127123",
                "tenXa": "Phường Tân Sơn"
            },
            {
                "maXa": "70127118",
                "tenXa": "Phường Tân Sơn Hoà"
            },
            {
                "maXa": "70128125",
                "tenXa": "Phường Tân Sơn Nhì"
            },
            {
                "maXa": "70127119",
                "tenXa": "Phường Tân Sơn Nhất"
            },
            {
                "maXa": "70113080",
                "tenXa": "Phường Tân Thuận"
            },
            {
                "maXa": "71709009",
                "tenXa": "Phường Tân Thành"
            },
            {
                "maXa": "70123096",
                "tenXa": "Phường Tân Thới Hiệp"
            },
            {
                "maXa": "70134100",
                "tenXa": "Phường Tân Tạo"
            },
            {
                "maXa": "71105042",
                "tenXa": "Phường Tân Uyên"
            },
            {
                "maXa": "71109030",
                "tenXa": "Phường Tân Đông Hiệp"
            },
            {
                "maXa": "70101064",
                "tenXa": "Phường Tân Định"
            },
            {
                "maXa": "71113047",
                "tenXa": "Phường Tây Nam"
            },
            {
                "maXa": "70128124",
                "tenXa": "Phường Tây Thạnh"
            },
            {
                "maXa": "70145133",
                "tenXa": "Phường Tăng Nhơn Phú"
            },
            {
                "maXa": "70107072",
                "tenXa": "Phường Vĩnh Hội"
            },
            {
                "maXa": "71105040",
                "tenXa": "Phường Vĩnh Tân"
            },
            {
                "maXa": "71701001",
                "tenXa": "Phường Vũng Tàu"
            },
            {
                "maXa": "70119088",
                "tenXa": "Phường Vườn Lài"
            },
            {
                "maXa": "70105068",
                "tenXa": "Phường Xuân Hoà"
            },
            {
                "maXa": "70107070",
                "tenXa": "Phường Xóm Chiếu"
            },
            {
                "maXa": "71109028",
                "tenXa": "Phường Đông Hoà"
            },
            {
                "maXa": "70123094",
                "tenXa": "Phường Đông Hưng Thuận"
            },
            {
                "maXa": "70131115",
                "tenXa": "Phường Đức Nhuận"
            },
            {
                "maXa": "71111053",
                "tenXa": "Xã An Long"
            },
            {
                "maXa": "70135154",
                "tenXa": "Xã An Nhơn Tây"
            },
            {
                "maXa": "70143149",
                "tenXa": "Xã An Thới Đông"
            },
            {
                "maXa": "70137161",
                "tenXa": "Xã Bà Điểm"
            },
            {
                "maXa": "71115058",
                "tenXa": "Xã Bàu Bàng"
            },
            {
                "maXa": "71707022",
                "tenXa": "Xã Bàu Lâm"
            },
            {
                "maXa": "70139145",
                "tenXa": "Xã Bình Chánh"
            },
            {
                "maXa": "71707166",
                "tenXa": "Xã Bình Châu"
            },
            {
                "maXa": "71705014",
                "tenXa": "Xã Bình Giã"
            },
            {
                "maXa": "70139147",
                "tenXa": "Xã Bình Hưng"
            },
            {
                "maXa": "70143148",
                "tenXa": "Xã Bình Khánh"
            },
            {
                "maXa": "70139143",
                "tenXa": "Xã Bình Lợi"
            },
            {
                "maXa": "70135157",
                "tenXa": "Xã Bình Mỹ"
            },
            {
                "maXa": "71117051",
                "tenXa": "Xã Bắc Tân Uyên"
            },
            {
                "maXa": "71709012",
                "tenXa": "Xã Châu Pha"
            },
            {
                "maXa": "71705016",
                "tenXa": "Xã Châu Đức"
            },
            {
                "maXa": "70143150",
                "tenXa": "Xã Cần Giờ"
            },
            {
                "maXa": "70135151",
                "tenXa": "Xã Củ Chi"
            },
            {
                "maXa": "71113061",
                "tenXa": "Xã Dầu Tiếng"
            },
            {
                "maXa": "70141163",
                "tenXa": "Xã Hiệp Phước"
            },
            {
                "maXa": "71707165",
                "tenXa": "Xã Hòa Hiệp"
            },
            {
                "maXa": "71707021",
                "tenXa": "Xã Hòa Hội"
            },
            {
                "maXa": "70137159",
                "tenXa": "Xã Hóc Môn"
            },
            {
                "maXa": "70139146",
                "tenXa": "Xã Hưng Long"
            },
            {
                "maXa": "71707019",
                "tenXa": "Xã Hồ Tràm"
            },
            {
                "maXa": "71705015",
                "tenXa": "Xã Kim Long"
            },
            {
                "maXa": "71113060",
                "tenXa": "Xã Long Hoà"
            },
            {
                "maXa": "71712024",
                "tenXa": "Xã Long Hải"
            },
            {
                "maXa": "71701164",
                "tenXa": "Xã Long Sơn"
            },
            {
                "maXa": "71712026",
                "tenXa": "Xã Long Điền"
            },
            {
                "maXa": "71113059",
                "tenXa": "Xã Minh Thạnh"
            },
            {
                "maXa": "71705018",
                "tenXa": "Xã Nghĩa Thành"
            },
            {
                "maXa": "71705013",
                "tenXa": "Xã Ngãi Giao"
            },
            {
                "maXa": "70135155",
                "tenXa": "Xã Nhuận Đức"
            },
            {
                "maXa": "70141162",
                "tenXa": "Xã Nhà Bè"
            },
            {
                "maXa": "71111056",
                "tenXa": "Xã Phú Giáo"
            },
            {
                "maXa": "70135156",
                "tenXa": "Xã Phú Hoà Đông"
            },
            {
                "maXa": "71111055",
                "tenXa": "Xã Phước Hoà"
            },
            {
                "maXa": "71712023",
                "tenXa": "Xã Phước Hải"
            },
            {
                "maXa": "71111054",
                "tenXa": "Xã Phước Thành"
            },
            {
                "maXa": "71113062",
                "tenXa": "Xã Thanh An"
            },
            {
                "maXa": "70135153",
                "tenXa": "Xã Thái Mỹ"
            },
            {
                "maXa": "71117052",
                "tenXa": "Xã Thường Tân"
            },
            {
                "maXa": "70143168",
                "tenXa": "Xã Thạnh An"
            },
            {
                "maXa": "71115057",
                "tenXa": "Xã Trừ Văn Thố"
            },
            {
                "maXa": "70135152",
                "tenXa": "Xã Tân An Hội"
            },
            {
                "maXa": "70139144",
                "tenXa": "Xã Tân Nhựt"
            },
            {
                "maXa": "70139142",
                "tenXa": "Xã Tân Vĩnh Lộc"
            },
            {
                "maXa": "70139141",
                "tenXa": "Xã Vĩnh Lộc"
            },
            {
                "maXa": "71707020",
                "tenXa": "Xã Xuyên Mộc"
            },
            {
                "maXa": "71705017",
                "tenXa": "Xã Xuân Sơn"
            },
            {
                "maXa": "70137160",
                "tenXa": "Xã Xuân Thới Sơn"
            },
            {
                "maXa": "70137158",
                "tenXa": "Xã Đông Thạnh"
            },
            {
                "maXa": "71712025",
                "tenXa": "Xã Đất Đỏ"
            },
            {
                "maXa": "71713027",
                "tenXa": "Đặc khu Côn Đảo"
            }
        ]
    },
    {
        "maThanhPho": "23",
        "thanhPho": "Tỉnh Khánh Hòa",
        "xaPhuong": [
            {
                "maXa": "51109008",
                "tenXa": "Phường Ba Ngòi"
            },
            {
                "maXa": "70501045",
                "tenXa": "Phường Bảo An"
            },
            {
                "maXa": "51109005",
                "tenXa": "Phường Bắc Cam Ranh"
            },
            {
                "maXa": "51101002",
                "tenXa": "Phường Bắc Nha Trang"
            },
            {
                "maXa": "51109007",
                "tenXa": "Phường Cam Linh"
            },
            {
                "maXa": "51109006",
                "tenXa": "Phường Cam Ranh"
            },
            {
                "maXa": "51105014",
                "tenXa": "Phường Hoà Thắng"
            },
            {
                "maXa": "51101004",
                "tenXa": "Phường Nam Nha Trang"
            },
            {
                "maXa": "51101001",
                "tenXa": "Phường Nha Trang"
            },
            {
                "maXa": "70505044",
                "tenXa": "Phường Ninh Chử"
            },
            {
                "maXa": "51105011",
                "tenXa": "Phường Ninh Hoà"
            },
            {
                "maXa": "70501042",
                "tenXa": "Phường Phan Rang"
            },
            {
                "maXa": "51101003",
                "tenXa": "Phường Tây Nha Trang"
            },
            {
                "maXa": "70501046",
                "tenXa": "Phường Đô Vinh"
            },
            {
                "maXa": "70501043",
                "tenXa": "Phường Đông Hải"
            },
            {
                "maXa": "51105013",
                "tenXa": "Phường Đông Ninh Hoà"
            },
            {
                "maXa": "70503061",
                "tenXa": "Xã Anh Dũng"
            },
            {
                "maXa": "70509064",
                "tenXa": "Xã Bác Ái"
            },
            {
                "maXa": "70509065",
                "tenXa": "Xã Bác Ái Tây"
            },
            {
                "maXa": "70509063",
                "tenXa": "Xã Bác Ái Đông"
            },
            {
                "maXa": "51111033",
                "tenXa": "Xã Bắc Khánh Vĩnh"
            },
            {
                "maXa": "51105010",
                "tenXa": "Xã Bắc Ninh Hoà"
            },
            {
                "maXa": "51117032",
                "tenXa": "Xã Cam An"
            },
            {
                "maXa": "51117031",
                "tenXa": "Xã Cam Hiệp"
            },
            {
                "maXa": "51117029",
                "tenXa": "Xã Cam Lâm"
            },
            {
                "maXa": "70513051",
                "tenXa": "Xã Cà Ná"
            },
            {
                "maXa": "70511058",
                "tenXa": "Xã Công Hải"
            },
            {
                "maXa": "51107023",
                "tenXa": "Xã Diên Khánh"
            },
            {
                "maXa": "51107026",
                "tenXa": "Xã Diên Lâm"
            },
            {
                "maXa": "51107024",
                "tenXa": "Xã Diên Lạc"
            },
            {
                "maXa": "51107027",
                "tenXa": "Xã Diên Thọ"
            },
            {
                "maXa": "51107025",
                "tenXa": "Xã Diên Điền"
            },
            {
                "maXa": "51105017",
                "tenXa": "Xã Hoà Trí"
            },
            {
                "maXa": "51113038",
                "tenXa": "Xã Khánh Sơn"
            },
            {
                "maXa": "51111037",
                "tenXa": "Xã Khánh Vĩnh"
            },
            {
                "maXa": "70503060",
                "tenXa": "Xã Lâm Sơn"
            },
            {
                "maXa": "70503062",
                "tenXa": "Xã Mỹ Sơn"
            },
            {
                "maXa": "51109009",
                "tenXa": "Xã Nam Cam Ranh"
            },
            {
                "maXa": "51111036",
                "tenXa": "Xã Nam Khánh Vĩnh"
            },
            {
                "maXa": "51105015",
                "tenXa": "Xã Nam Ninh Hoà"
            },
            {
                "maXa": "70505054",
                "tenXa": "Xã Ninh Hải"
            },
            {
                "maXa": "70507047",
                "tenXa": "Xã Ninh Phước"
            },
            {
                "maXa": "70503059",
                "tenXa": "Xã Ninh Sơn"
            },
            {
                "maXa": "70513053",
                "tenXa": "Xã Phước Dinh"
            },
            {
                "maXa": "70513052",
                "tenXa": "Xã Phước Hà"
            },
            {
                "maXa": "70507049",
                "tenXa": "Xã Phước Hậu"
            },
            {
                "maXa": "70507048",
                "tenXa": "Xã Phước Hữu"
            },
            {
                "maXa": "51117030",
                "tenXa": "Xã Suối Dầu"
            },
            {
                "maXa": "51107028",
                "tenXa": "Xã Suối Hiệp"
            },
            {
                "maXa": "70511057",
                "tenXa": "Xã Thuận Bắc"
            },
            {
                "maXa": "70513050",
                "tenXa": "Xã Thuận Nam"
            },
            {
                "maXa": "51111034",
                "tenXa": "Xã Trung Khánh Vĩnh"
            },
            {
                "maXa": "51103019",
                "tenXa": "Xã Tu Bông"
            },
            {
                "maXa": "51105012",
                "tenXa": "Xã Tân Định"
            },
            {
                "maXa": "51113039",
                "tenXa": "Xã Tây Khánh Sơn"
            },
            {
                "maXa": "51111035",
                "tenXa": "Xã Tây Khánh Vĩnh"
            },
            {
                "maXa": "51105016",
                "tenXa": "Xã Tây Ninh Hoà"
            },
            {
                "maXa": "70505056",
                "tenXa": "Xã Vĩnh Hải"
            },
            {
                "maXa": "51103022",
                "tenXa": "Xã Vạn Hưng"
            },
            {
                "maXa": "51103021",
                "tenXa": "Xã Vạn Ninh"
            },
            {
                "maXa": "51103020",
                "tenXa": "Xã Vạn Thắng"
            },
            {
                "maXa": "70505055",
                "tenXa": "Xã Xuân Hải"
            },
            {
                "maXa": "51113040",
                "tenXa": "Xã Đông Khánh Sơn"
            },
            {
                "maXa": "51103018",
                "tenXa": "Xã Đại Lãnh"
            },
            {
                "maXa": "51115041",
                "tenXa": "Đặc khu Trường Sa"
            }
        ]
    },
    {
        "maThanhPho": "14",
        "thanhPho": "Tỉnh Lai Châu",
        "xaPhuong": [
            {
                "maXa": "30202013",
                "tenXa": "Phường Tân Phong"
            },
            {
                "maXa": "30202014",
                "tenXa": "Phường Đoàn Kết"
            },
            {
                "maXa": "30201032",
                "tenXa": "Xã Bum Nưa"
            },
            {
                "maXa": "30201033",
                "tenXa": "Xã Bum Tở"
            },
            {
                "maXa": "30205010",
                "tenXa": "Xã Bình Lư"
            },
            {
                "maXa": "30205009",
                "tenXa": "Xã Bản Bo"
            },
            {
                "maXa": "30203018",
                "tenXa": "Xã Dào San"
            },
            {
                "maXa": "30213030",
                "tenXa": "Xã Hua Bum"
            },
            {
                "maXa": "30207022",
                "tenXa": "Xã Hồng Thu"
            },
            {
                "maXa": "30209002",
                "tenXa": "Xã Khoen On"
            },
            {
                "maXa": "30205012",
                "tenXa": "Xã Khun Há"
            },
            {
                "maXa": "30203019",
                "tenXa": "Xã Khổng Lào"
            },
            {
                "maXa": "30213027",
                "tenXa": "Xã Lê Lợi"
            },
            {
                "maXa": "30201038",
                "tenXa": "Xã Mù Cả"
            },
            {
                "maXa": "30211008",
                "tenXa": "Xã Mường Khoa"
            },
            {
                "maXa": "30209001",
                "tenXa": "Xã Mường Kim"
            },
            {
                "maXa": "30213029",
                "tenXa": "Xã Mường Mô"
            },
            {
                "maXa": "30209004",
                "tenXa": "Xã Mường Than"
            },
            {
                "maXa": "30201034",
                "tenXa": "Xã Mường Tè"
            },
            {
                "maXa": "30207025",
                "tenXa": "Xã Nậm Cuổi"
            },
            {
                "maXa": "30213028",
                "tenXa": "Xã Nậm Hàng"
            },
            {
                "maXa": "30207026",
                "tenXa": "Xã Nậm Mạ"
            },
            {
                "maXa": "30211006",
                "tenXa": "Xã Nậm Sỏ"
            },
            {
                "maXa": "30207023",
                "tenXa": "Xã Nậm Tăm"
            },
            {
                "maXa": "30213031",
                "tenXa": "Xã Pa Tần"
            },
            {
                "maXa": "30201036",
                "tenXa": "Xã Pa Ủ"
            },
            {
                "maXa": "30203016",
                "tenXa": "Xã Phong Thổ"
            },
            {
                "maXa": "30207024",
                "tenXa": "Xã Pu Sam Cáp"
            },
            {
                "maXa": "30211005",
                "tenXa": "Xã Pắc Ta"
            },
            {
                "maXa": "30203015",
                "tenXa": "Xã Sin Suối Hồ"
            },
            {
                "maXa": "30203017",
                "tenXa": "Xã Sì Lở Lầu"
            },
            {
                "maXa": "30207021",
                "tenXa": "Xã Sìn Hồ"
            },
            {
                "maXa": "30209003",
                "tenXa": "Xã Than Uyên"
            },
            {
                "maXa": "30201035",
                "tenXa": "Xã Thu Lũm"
            },
            {
                "maXa": "30201037",
                "tenXa": "Xã Tà Tổng"
            },
            {
                "maXa": "30211007",
                "tenXa": "Xã Tân Uyên"
            },
            {
                "maXa": "30205011",
                "tenXa": "Xã Tả Lèng"
            },
            {
                "maXa": "30207020",
                "tenXa": "Xã Tủa Sín Chải"
            }
        ]
    },
    {
        "maThanhPho": "09",
        "thanhPho": "Tỉnh Lào Cai",
        "xaPhuong": [
            {
                "maXa": "20501053",
                "tenXa": "Phường Cam Đường"
            },
            {
                "maXa": "21303010",
                "tenXa": "Phường Cầu Thia"
            },
            {
                "maXa": "20501054",
                "tenXa": "Phường Lào Cai"
            },
            {
                "maXa": "21301039",
                "tenXa": "Phường Nam Cường"
            },
            {
                "maXa": "21303008",
                "tenXa": "Phường Nghĩa Lộ"
            },
            {
                "maXa": "20513079",
                "tenXa": "Phường Sa Pa"
            },
            {
                "maXa": "21303009",
                "tenXa": "Phường Trung Tâm"
            },
            {
                "maXa": "21301037",
                "tenXa": "Phường Văn Phú"
            },
            {
                "maXa": "21301038",
                "tenXa": "Phường Yên Bái"
            },
            {
                "maXa": "21301040",
                "tenXa": "Phường Âu Lâu"
            },
            {
                "maXa": "20507058",
                "tenXa": "Xã A Mú Sung"
            },
            {
                "maXa": "20507061",
                "tenXa": "Xã Bát Xát"
            },
            {
                "maXa": "20513076",
                "tenXa": "Xã Bản Hồ"
            },
            {
                "maXa": "20509082",
                "tenXa": "Xã Bản Liền"
            },
            {
                "maXa": "20505088",
                "tenXa": "Xã Bản Lầu"
            },
            {
                "maXa": "20507060",
                "tenXa": "Xã Bản Xèo"
            },
            {
                "maXa": "20515067",
                "tenXa": "Xã Bảo Hà"
            },
            {
                "maXa": "20509081",
                "tenXa": "Xã Bảo Nhai"
            },
            {
                "maXa": "20511048",
                "tenXa": "Xã Bảo Thắng"
            },
            {
                "maXa": "20515064",
                "tenXa": "Xã Bảo Yên"
            },
            {
                "maXa": "21313036",
                "tenXa": "Xã Bảo Ái"
            },
            {
                "maXa": "20509083",
                "tenXa": "Xã Bắc Hà"
            },
            {
                "maXa": "20505089",
                "tenXa": "Xã Cao Sơn"
            },
            {
                "maXa": "20519072",
                "tenXa": "Xã Chiềng Ken"
            },
            {
                "maXa": "21307019",
                "tenXa": "Xã Châu Quế"
            },
            {
                "maXa": "21315015",
                "tenXa": "Xã Chấn Thịnh"
            },
            {
                "maXa": "21309093",
                "tenXa": "Xã Chế Tạo"
            },
            {
                "maXa": "21315097",
                "tenXa": "Xã Cát Thịnh"
            },
            {
                "maXa": "21313032",
                "tenXa": "Xã Cảm Nhân"
            },
            {
                "maXa": "20509080",
                "tenXa": "Xã Cốc Lầu"
            },
            {
                "maXa": "20501051",
                "tenXa": "Xã Cốc San"
            },
            {
                "maXa": "20519071",
                "tenXa": "Xã Dương Quỳ"
            },
            {
                "maXa": "20507056",
                "tenXa": "Xã Dền Sáng"
            },
            {
                "maXa": "21315012",
                "tenXa": "Xã Gia Hội"
            },
            {
                "maXa": "20511050",
                "tenXa": "Xã Gia Phú"
            },
            {
                "maXa": "21311042",
                "tenXa": "Xã Hưng Khánh"
            },
            {
                "maXa": "21317006",
                "tenXa": "Xã Hạnh Phúc"
            },
            {
                "maXa": "20501052",
                "tenXa": "Xã Hợp Thành"
            },
            {
                "maXa": "21309001",
                "tenXa": "Xã Khao Mang"
            },
            {
                "maXa": "21305029",
                "tenXa": "Xã Khánh Hoà"
            },
            {
                "maXa": "20519069",
                "tenXa": "Xã Khánh Yên"
            },
            {
                "maXa": "21309092",
                "tenXa": "Xã Lao Chải"
            },
            {
                "maXa": "21303011",
                "tenXa": "Xã Liên Sơn"
            },
            {
                "maXa": "21307020",
                "tenXa": "Xã Lâm Giang"
            },
            {
                "maXa": "21305026",
                "tenXa": "Xã Lâm Thượng"
            },
            {
                "maXa": "20509085",
                "tenXa": "Xã Lùng Phình"
            },
            {
                "maXa": "21311043",
                "tenXa": "Xã Lương Thịnh"
            },
            {
                "maXa": "21305027",
                "tenXa": "Xã Lục Yên"
            },
            {
                "maXa": "20519073",
                "tenXa": "Xã Minh Lương"
            },
            {
                "maXa": "21307025",
                "tenXa": "Xã Mỏ Vàng"
            },
            {
                "maXa": "21309002",
                "tenXa": "Xã Mù Cang Chải"
            },
            {
                "maXa": "20513075",
                "tenXa": "Xã Mường Bo"
            },
            {
                "maXa": "20507055",
                "tenXa": "Xã Mường Hum"
            },
            {
                "maXa": "20505087",
                "tenXa": "Xã Mường Khương"
            },
            {
                "maXa": "21305031",
                "tenXa": "Xã Mường Lai"
            },
            {
                "maXa": "21307023",
                "tenXa": "Xã Mậu A"
            },
            {
                "maXa": "21315016",
                "tenXa": "Xã Nghĩa Tâm"
            },
            {
                "maXa": "20515062",
                "tenXa": "Xã Nghĩa Đô"
            },
            {
                "maXa": "20513099",
                "tenXa": "Xã Ngũ Chỉ Sơn"
            },
            {
                "maXa": "20519074",
                "tenXa": "Xã Nậm Chày"
            },
            {
                "maXa": "21309094",
                "tenXa": "Xã Nậm Có"
            },
            {
                "maXa": "20519098",
                "tenXa": "Xã Nậm Xé"
            },
            {
                "maXa": "20505086",
                "tenXa": "Xã Pha Long"
            },
            {
                "maXa": "21307018",
                "tenXa": "Xã Phong Dụ Hạ"
            },
            {
                "maXa": "21307096",
                "tenXa": "Xã Phong Dụ Thượng"
            },
            {
                "maXa": "20511046",
                "tenXa": "Xã Phong Hải"
            },
            {
                "maXa": "21317007",
                "tenXa": "Xã Phình Hồ"
            },
            {
                "maXa": "20515066",
                "tenXa": "Xã Phúc Khánh"
            },
            {
                "maXa": "21305030",
                "tenXa": "Xã Phúc Lợi"
            },
            {
                "maXa": "21309003",
                "tenXa": "Xã Púng Luông"
            },
            {
                "maXa": "21311045",
                "tenXa": "Xã Quy Mông"
            },
            {
                "maXa": "20521090",
                "tenXa": "Xã Si Ma Cai"
            },
            {
                "maXa": "20521091",
                "tenXa": "Xã Sín Chéng"
            },
            {
                "maXa": "21315013",
                "tenXa": "Xã Sơn Lương"
            },
            {
                "maXa": "21313034",
                "tenXa": "Xã Thác Bà"
            },
            {
                "maXa": "21315014",
                "tenXa": "Xã Thượng Bằng La"
            },
            {
                "maXa": "20515063",
                "tenXa": "Xã Thượng Hà"
            },
            {
                "maXa": "21317005",
                "tenXa": "Xã Trạm Tấu"
            },
            {
                "maXa": "21311041",
                "tenXa": "Xã Trấn Yên"
            },
            {
                "maXa": "20507059",
                "tenXa": "Xã Trịnh Tường"
            },
            {
                "maXa": "21317095",
                "tenXa": "Xã Tà Xi Láng"
            },
            {
                "maXa": "21307022",
                "tenXa": "Xã Tân Hợp"
            },
            {
                "maXa": "21305028",
                "tenXa": "Xã Tân Lĩnh"
            },
            {
                "maXa": "21315004",
                "tenXa": "Xã Tú Lệ"
            },
            {
                "maXa": "20509084",
                "tenXa": "Xã Tả Củ Tỷ"
            },
            {
                "maXa": "20513077",
                "tenXa": "Xã Tả Phìn"
            },
            {
                "maXa": "20513078",
                "tenXa": "Xã Tả Van"
            },
            {
                "maXa": "20511049",
                "tenXa": "Xã Tằng Lỏong"
            },
            {
                "maXa": "21311044",
                "tenXa": "Xã Việt Hồng"
            },
            {
                "maXa": "20519068",
                "tenXa": "Xã Võ Lao"
            },
            {
                "maXa": "20519070",
                "tenXa": "Xã Văn Bàn"
            },
            {
                "maXa": "21315017",
                "tenXa": "Xã Văn Chấn"
            },
            {
                "maXa": "20515065",
                "tenXa": "Xã Xuân Hoà"
            },
            {
                "maXa": "20511047",
                "tenXa": "Xã Xuân Quang"
            },
            {
                "maXa": "21307024",
                "tenXa": "Xã Xuân Ái"
            },
            {
                "maXa": "20507057",
                "tenXa": "Xã Y Tý"
            },
            {
                "maXa": "21313035",
                "tenXa": "Xã Yên Bình"
            },
            {
                "maXa": "21313033",
                "tenXa": "Xã Yên Thành"
            },
            {
                "maXa": "21307021",
                "tenXa": "Xã Đông Cuông"
            }
        ]
    },
    {
        "maThanhPho": "26",
        "thanhPho": "Tỉnh Lâm Đồng",
        "xaPhuong": [
            {
                "maXa": "70303006",
                "tenXa": "Phường 1 Bảo Lộc"
            },
            {
                "maXa": "70303007",
                "tenXa": "Phường 2 Bảo Lộc"
            },
            {
                "maXa": "70303008",
                "tenXa": "Phường 3 Bảo Lộc"
            },
            {
                "maXa": "70303009",
                "tenXa": "Phường B' Lao"
            },
            {
                "maXa": "71501052",
                "tenXa": "Phường Bình Thuận"
            },
            {
                "maXa": "60613096",
                "tenXa": "Phường Bắc Gia Nghĩa"
            },
            {
                "maXa": "70301002",
                "tenXa": "Phường Cam Ly - Đà Lạt"
            },
            {
                "maXa": "71501051",
                "tenXa": "Phường Hàm Thắng"
            },
            {
                "maXa": "71513057",
                "tenXa": "Phường La Gi"
            },
            {
                "maXa": "70305005",
                "tenXa": "Phường Langbiang - Đà Lạt"
            },
            {
                "maXa": "70301003",
                "tenXa": "Phường Lâm Viên - Đà Lạt"
            },
            {
                "maXa": "71501053",
                "tenXa": "Phường Mũi Né"
            },
            {
                "maXa": "60613097",
                "tenXa": "Phường Nam Gia Nghĩa"
            },
            {
                "maXa": "71501055",
                "tenXa": "Phường Phan Thiết"
            },
            {
                "maXa": "71501054",
                "tenXa": "Phường Phú Thuỷ"
            },
            {
                "maXa": "71513058",
                "tenXa": "Phường Phước Hội"
            },
            {
                "maXa": "71501056",
                "tenXa": "Phường Tiến Thành"
            },
            {
                "maXa": "70301001",
                "tenXa": "Phường Xuân Hương - Đà Lạt"
            },
            {
                "maXa": "70301004",
                "tenXa": "Phường Xuân Trường - Đà Lạt"
            },
            {
                "maXa": "60613098",
                "tenXa": "Phường Đông Gia Nghĩa"
            },
            {
                "maXa": "70313037",
                "tenXa": "Xã Bảo Lâm 1"
            },
            {
                "maXa": "70313038",
                "tenXa": "Xã Bảo Lâm 2"
            },
            {
                "maXa": "70313039",
                "tenXa": "Xã Bảo Lâm 3"
            },
            {
                "maXa": "70313040",
                "tenXa": "Xã Bảo Lâm 4"
            },
            {
                "maXa": "70313041",
                "tenXa": "Xã Bảo Lâm 5"
            },
            {
                "maXa": "70315034",
                "tenXa": "Xã Bảo Thuận"
            },
            {
                "maXa": "71505065",
                "tenXa": "Xã Bắc Bình"
            },
            {
                "maXa": "71511086",
                "tenXa": "Xã Bắc Ruộng"
            },
            {
                "maXa": "70317048",
                "tenXa": "Xã Cát Tiên"
            },
            {
                "maXa": "70317049",
                "tenXa": "Xã Cát Tiên 2"
            },
            {
                "maXa": "70317050",
                "tenXa": "Xã Cát Tiên 3"
            },
            {
                "maXa": "60603101",
                "tenXa": "Xã Cư Jút"
            },
            {
                "maXa": "70307014",
                "tenXa": "Xã D'Ran"
            },
            {
                "maXa": "70315030",
                "tenXa": "Xã Di Linh"
            },
            {
                "maXa": "70315036",
                "tenXa": "Xã Gia Hiệp"
            },
            {
                "maXa": "70309015",
                "tenXa": "Xã Hiệp Thạnh"
            },
            {
                "maXa": "70315032",
                "tenXa": "Xã Hoà Bắc"
            },
            {
                "maXa": "70315031",
                "tenXa": "Xã Hoà Ninh"
            },
            {
                "maXa": "71505071",
                "tenXa": "Xã Hoà Thắng"
            },
            {
                "maXa": "71515093",
                "tenXa": "Xã Hoài Đức"
            },
            {
                "maXa": "71509079",
                "tenXa": "Xã Hàm Kiệm"
            },
            {
                "maXa": "71507077",
                "tenXa": "Xã Hàm Liêm"
            },
            {
                "maXa": "71507075",
                "tenXa": "Xã Hàm Thuận"
            },
            {
                "maXa": "71507074",
                "tenXa": "Xã Hàm Thuận Bắc"
            },
            {
                "maXa": "71509081",
                "tenXa": "Xã Hàm Thuận Nam"
            },
            {
                "maXa": "71509078",
                "tenXa": "Xã Hàm Thạnh"
            },
            {
                "maXa": "71514084",
                "tenXa": "Xã Hàm Tân"
            },
            {
                "maXa": "71505067",
                "tenXa": "Xã Hải Ninh"
            },
            {
                "maXa": "71507076",
                "tenXa": "Xã Hồng Sơn"
            },
            {
                "maXa": "71505066",
                "tenXa": "Xã Hồng Thái"
            },
            {
                "maXa": "70307012",
                "tenXa": "Xã Ka Đô"
            },
            {
                "maXa": "60611118",
                "tenXa": "Xã Kiến Đức"
            },
            {
                "maXa": "60605107",
                "tenXa": "Xã Krông Nô"
            },
            {
                "maXa": "71507073",
                "tenXa": "Xã La Dạ"
            },
            {
                "maXa": "71503062",
                "tenXa": "Xã Liên Hương"
            },
            {
                "maXa": "71505070",
                "tenXa": "Xã Lương Sơn"
            },
            {
                "maXa": "70305010",
                "tenXa": "Xã Lạc Dương"
            },
            {
                "maXa": "70311023",
                "tenXa": "Xã Nam Ban - Lâm Hà"
            },
            {
                "maXa": "60603100",
                "tenXa": "Xã Nam Dong"
            },
            {
                "maXa": "70311022",
                "tenXa": "Xã Nam Hà - Lâm Hà"
            },
            {
                "maXa": "71515091",
                "tenXa": "Xã Nam Thành"
            },
            {
                "maXa": "60605106",
                "tenXa": "Xã Nam Đà"
            },
            {
                "maXa": "71511087",
                "tenXa": "Xã Nghị Đức"
            },
            {
                "maXa": "60611119",
                "tenXa": "Xã Nhân Cơ"
            },
            {
                "maXa": "70309121",
                "tenXa": "Xã Ninh Gia"
            },
            {
                "maXa": "60605108",
                "tenXa": "Xã Nâm Nung"
            },
            {
                "maXa": "71503064",
                "tenXa": "Xã Phan Rí Cửa"
            },
            {
                "maXa": "71505068",
                "tenXa": "Xã Phan Sơn"
            },
            {
                "maXa": "70311021",
                "tenXa": "Xã Phú Sơn - Lâm Hà"
            },
            {
                "maXa": "70311025",
                "tenXa": "Xã Phúc Thọ - Lâm Hà"
            },
            {
                "maXa": "60615122",
                "tenXa": "Xã Quảng Hoà"
            },
            {
                "maXa": "60615115",
                "tenXa": "Xã Quảng Khê"
            },
            {
                "maXa": "70307013",
                "tenXa": "Xã Quảng Lập"
            },
            {
                "maXa": "60605109",
                "tenXa": "Xã Quảng Phú"
            },
            {
                "maXa": "60615123",
                "tenXa": "Xã Quảng Sơn"
            },
            {
                "maXa": "60617124",
                "tenXa": "Xã Quảng Trực"
            },
            {
                "maXa": "60617116",
                "tenXa": "Xã Quảng Tân"
            },
            {
                "maXa": "60611120",
                "tenXa": "Xã Quảng Tín"
            },
            {
                "maXa": "71511090",
                "tenXa": "Xã Suối Kiết"
            },
            {
                "maXa": "71505069",
                "tenXa": "Xã Sông Lũy"
            },
            {
                "maXa": "71514085",
                "tenXa": "Xã Sơn Mỹ"
            },
            {
                "maXa": "70315035",
                "tenXa": "Xã Sơn Điền"
            },
            {
                "maXa": "60607102",
                "tenXa": "Xã Thuận An"
            },
            {
                "maXa": "60609112",
                "tenXa": "Xã Thuận Hạnh"
            },
            {
                "maXa": "71515094",
                "tenXa": "Xã Trà Tân"
            },
            {
                "maXa": "60609113",
                "tenXa": "Xã Trường Xuân"
            },
            {
                "maXa": "71503063",
                "tenXa": "Xã Tuy Phong"
            },
            {
                "maXa": "60617117",
                "tenXa": "Xã Tuy Đức"
            },
            {
                "maXa": "71501059",
                "tenXa": "Xã Tuyên Quang"
            },
            {
                "maXa": "70309018",
                "tenXa": "Xã Tà Hine"
            },
            {
                "maXa": "70309019",
                "tenXa": "Xã Tà Năng"
            },
            {
                "maXa": "60615114",
                "tenXa": "Xã Tà Đùng"
            },
            {
                "maXa": "71511089",
                "tenXa": "Xã Tánh Linh"
            },
            {
                "maXa": "70311024",
                "tenXa": "Xã Tân Hà - Lâm Hà"
            },
            {
                "maXa": "71513060",
                "tenXa": "Xã Tân Hải"
            },
            {
                "maXa": "70309017",
                "tenXa": "Xã Tân Hội"
            },
            {
                "maXa": "71509082",
                "tenXa": "Xã Tân Lập"
            },
            {
                "maXa": "71514083",
                "tenXa": "Xã Tân Minh"
            },
            {
                "maXa": "71509080",
                "tenXa": "Xã Tân Thành"
            },
            {
                "maXa": "71503061",
                "tenXa": "Xã Vĩnh Hảo"
            },
            {
                "maXa": "70323026",
                "tenXa": "Xã Đam Rông 1"
            },
            {
                "maXa": "70323027",
                "tenXa": "Xã Đam Rông 2"
            },
            {
                "maXa": "70323028",
                "tenXa": "Xã Đam Rông 3"
            },
            {
                "maXa": "70323029",
                "tenXa": "Xã Đam Rông 4"
            },
            {
                "maXa": "70315033",
                "tenXa": "Xã Đinh Trang Thượng"
            },
            {
                "maXa": "70311020",
                "tenXa": "Xã Đinh Văn - Lâm Hà"
            },
            {
                "maXa": "71507072",
                "tenXa": "Xã Đông Giang"
            },
            {
                "maXa": "70307011",
                "tenXa": "Xã Đơn Dương"
            },
            {
                "maXa": "70317042",
                "tenXa": "Xã Đạ Huoai"
            },
            {
                "maXa": "70317043",
                "tenXa": "Xã Đạ Huoai 2"
            },
            {
                "maXa": "70317044",
                "tenXa": "Xã Đạ Huoai 3"
            },
            {
                "maXa": "70317045",
                "tenXa": "Xã Đạ Tẻh"
            },
            {
                "maXa": "70317046",
                "tenXa": "Xã Đạ Tẻh 2"
            },
            {
                "maXa": "70317047",
                "tenXa": "Xã Đạ Tẻh 3"
            },
            {
                "maXa": "60607104",
                "tenXa": "Xã Đắk Mil"
            },
            {
                "maXa": "60609110",
                "tenXa": "Xã Đắk song"
            },
            {
                "maXa": "60607105",
                "tenXa": "Xã Đắk Sắk"
            },
            {
                "maXa": "60603099",
                "tenXa": "Xã Đắk Wil"
            },
            {
                "maXa": "71511088",
                "tenXa": "Xã Đồng Kho"
            },
            {
                "maXa": "60609111",
                "tenXa": "Xã Đức An"
            },
            {
                "maXa": "71515092",
                "tenXa": "Xã Đức Linh"
            },
            {
                "maXa": "60607103",
                "tenXa": "Xã Đức Lập"
            },
            {
                "maXa": "70309016",
                "tenXa": "Xã Đức Trọng"
            },
            {
                "maXa": "71517095",
                "tenXa": "Đặc khu Phú Quý"
            }
        ]
    },
    {
        "maThanhPho": "11",
        "thanhPho": "Tỉnh Lạng Sơn",
        "xaPhuong": [
            {
                "maXa": "20913064",
                "tenXa": "Phường Kỳ Lừa"
            },
            {
                "maXa": "20901063",
                "tenXa": "Phường Lương Văn Tri"
            },
            {
                "maXa": "20901062",
                "tenXa": "Phường Tam Thanh"
            },
            {
                "maXa": "20901065",
                "tenXa": "Phường Đông Kinh"
            },
            {
                "maXa": "20913061",
                "tenXa": "Xã Ba Sơn"
            },
            {
                "maXa": "20907008",
                "tenXa": "Xã Bình Gia"
            },
            {
                "maXa": "20909016",
                "tenXa": "Xã Bắc Sơn"
            },
            {
                "maXa": "20917056",
                "tenXa": "Xã Bằng Mạc"
            },
            {
                "maXa": "20921051",
                "tenXa": "Xã Cai Kinh"
            },
            {
                "maXa": "20913059",
                "tenXa": "Xã Cao Lộc"
            },
            {
                "maXa": "20917052",
                "tenXa": "Xã Chi Lăng"
            },
            {
                "maXa": "20917054",
                "tenXa": "Xã Chiến Thắng"
            },
            {
                "maXa": "20919041",
                "tenXa": "Xã Châu Sơn"
            },
            {
                "maXa": "20913060",
                "tenXa": "Xã Công Sơn"
            },
            {
                "maXa": "20907011",
                "tenXa": "Xã Hoa Thám"
            },
            {
                "maXa": "20905032",
                "tenXa": "Xã Hoàng Văn Thụ"
            },
            {
                "maXa": "20909017",
                "tenXa": "Xã Hưng Vũ"
            },
            {
                "maXa": "20907010",
                "tenXa": "Xã Hồng Phong"
            },
            {
                "maXa": "20905030",
                "tenXa": "Xã Hội Hoan"
            },
            {
                "maXa": "20921050",
                "tenXa": "Xã Hữu Liên"
            },
            {
                "maXa": "20921044",
                "tenXa": "Xã Hữu Lũng"
            },
            {
                "maXa": "20915039",
                "tenXa": "Xã Khuất Xá"
            },
            {
                "maXa": "20903006",
                "tenXa": "Xã Kháng Chiến"
            },
            {
                "maXa": "20913027",
                "tenXa": "Xã Khánh Khê"
            },
            {
                "maXa": "20919042",
                "tenXa": "Xã Kiên Mộc"
            },
            {
                "maXa": "20915033",
                "tenXa": "Xã Lộc Bình"
            },
            {
                "maXa": "20915036",
                "tenXa": "Xã Lợi Bác"
            },
            {
                "maXa": "20915034",
                "tenXa": "Xã Mẫu Sơn"
            },
            {
                "maXa": "20915035",
                "tenXa": "Xã Na Dương"
            },
            {
                "maXa": "20905028",
                "tenXa": "Xã Na Sầm"
            },
            {
                "maXa": "20917053",
                "tenXa": "Xã Nhân Lý"
            },
            {
                "maXa": "20909019",
                "tenXa": "Xã Nhất Hoà"
            },
            {
                "maXa": "20917055",
                "tenXa": "Xã Quan Sơn"
            },
            {
                "maXa": "20907012",
                "tenXa": "Xã Quý Hoà"
            },
            {
                "maXa": "20903005",
                "tenXa": "Xã Quốc Khánh"
            },
            {
                "maXa": "20903007",
                "tenXa": "Xã Quốc Việt"
            },
            {
                "maXa": "20907013",
                "tenXa": "Xã Thiện Hoà"
            },
            {
                "maXa": "20907015",
                "tenXa": "Xã Thiện Long"
            },
            {
                "maXa": "20907014",
                "tenXa": "Xã Thiện Thuật"
            },
            {
                "maXa": "20921048",
                "tenXa": "Xã Thiện Tân"
            },
            {
                "maXa": "20919043",
                "tenXa": "Xã Thái Bình"
            },
            {
                "maXa": "20903001",
                "tenXa": "Xã Thất Khê"
            },
            {
                "maXa": "20915037",
                "tenXa": "Xã Thống Nhất"
            },
            {
                "maXa": "20905031",
                "tenXa": "Xã Thụy Hùng"
            },
            {
                "maXa": "20911024",
                "tenXa": "Xã Tri Lễ"
            },
            {
                "maXa": "20903004",
                "tenXa": "Xã Tràng Định"
            },
            {
                "maXa": "20921045",
                "tenXa": "Xã Tuấn Sơn"
            },
            {
                "maXa": "20921046",
                "tenXa": "Xã Tân Thành"
            },
            {
                "maXa": "20903003",
                "tenXa": "Xã Tân Tiến"
            },
            {
                "maXa": "20909021",
                "tenXa": "Xã Tân Tri"
            },
            {
                "maXa": "20907009",
                "tenXa": "Xã Tân Văn"
            },
            {
                "maXa": "20911026",
                "tenXa": "Xã Tân Đoàn"
            },
            {
                "maXa": "20921047",
                "tenXa": "Xã Vân Nham"
            },
            {
                "maXa": "20905029",
                "tenXa": "Xã Văn Lãng"
            },
            {
                "maXa": "20911022",
                "tenXa": "Xã Văn Quan"
            },
            {
                "maXa": "20909018",
                "tenXa": "Xã Vũ Lăng"
            },
            {
                "maXa": "20909020",
                "tenXa": "Xã Vũ Lễ"
            },
            {
                "maXa": "20917057",
                "tenXa": "Xã Vạn Linh"
            },
            {
                "maXa": "20915038",
                "tenXa": "Xã Xuân Dương"
            },
            {
                "maXa": "20921049",
                "tenXa": "Xã Yên Bình"
            },
            {
                "maXa": "20911025",
                "tenXa": "Xã Yên Phúc"
            },
            {
                "maXa": "20911023",
                "tenXa": "Xã Điềm He"
            },
            {
                "maXa": "20903002",
                "tenXa": "Xã Đoàn Kết"
            },
            {
                "maXa": "20919040",
                "tenXa": "Xã Đình Lập"
            },
            {
                "maXa": "20913058",
                "tenXa": "Xã Đồng Đăng"
            }
        ]
    },
    {
        "maThanhPho": "17",
        "thanhPho": "Tỉnh Nghệ An",
        "xaPhuong": [
            {
                "maXa": "40301121",
                "tenXa": "Phường Cửa Lò"
            },
            {
                "maXa": "40339027",
                "tenXa": "Phường Hoàng Mai"
            },
            {
                "maXa": "40339029",
                "tenXa": "Phường Quỳnh Mai"
            },
            {
                "maXa": "40301117",
                "tenXa": "Phường Thành Vinh"
            },
            {
                "maXa": "40314095",
                "tenXa": "Phường Thái Hoà"
            },
            {
                "maXa": "40301116",
                "tenXa": "Phường Trường Vinh"
            },
            {
                "maXa": "40339028",
                "tenXa": "Phường Tân Mai"
            },
            {
                "maXa": "40314096",
                "tenXa": "Phường Tây Hiếu"
            },
            {
                "maXa": "40301118",
                "tenXa": "Phường Vinh Hưng"
            },
            {
                "maXa": "40301120",
                "tenXa": "Phường Vinh Lộc"
            },
            {
                "maXa": "40301119",
                "tenXa": "Phường Vinh Phú"
            },
            {
                "maXa": "40325018",
                "tenXa": "Xã An Châu"
            },
            {
                "maXa": "40327001",
                "tenXa": "Xã Anh Sơn"
            },
            {
                "maXa": "40327004",
                "tenXa": "Xã Anh Sơn Đông"
            },
            {
                "maXa": "40321012",
                "tenXa": "Xã Bình Chuẩn"
            },
            {
                "maXa": "40323129",
                "tenXa": "Xã Bình Minh"
            },
            {
                "maXa": "40331104",
                "tenXa": "Xã Bích Hào"
            },
            {
                "maXa": "40329024",
                "tenXa": "Xã Bạch Hà"
            },
            {
                "maXa": "40329022",
                "tenXa": "Xã Bạch Ngọc"
            },
            {
                "maXa": "40309042",
                "tenXa": "Xã Bắc Lý"
            },
            {
                "maXa": "40321010",
                "tenXa": "Xã Cam Phục"
            },
            {
                "maXa": "40309037",
                "tenXa": "Xã Chiêu Lưu"
            },
            {
                "maXa": "40307073",
                "tenXa": "Xã Châu Bình"
            },
            {
                "maXa": "40311077",
                "tenXa": "Xã Châu Hồng"
            },
            {
                "maXa": "40321011",
                "tenXa": "Xã Châu Khê"
            },
            {
                "maXa": "40311076",
                "tenXa": "Xã Châu Lộc"
            },
            {
                "maXa": "40307071",
                "tenXa": "Xã Châu Tiến"
            },
            {
                "maXa": "40321007",
                "tenXa": "Xã Con Cuông"
            },
            {
                "maXa": "40331098",
                "tenXa": "Xã Cát Ngạn"
            },
            {
                "maXa": "40325013",
                "tenXa": "Xã Diễn Châu"
            },
            {
                "maXa": "40323128",
                "tenXa": "Xã Giai Lạc"
            },
            {
                "maXa": "40319092",
                "tenXa": "Xã Giai Xuân"
            },
            {
                "maXa": "40331102",
                "tenXa": "Xã Hoa Quân"
            },
            {
                "maXa": "40309044",
                "tenXa": "Xã Huồi Tụ"
            },
            {
                "maXa": "40307072",
                "tenXa": "Xã Hùng Chân"
            },
            {
                "maXa": "40325020",
                "tenXa": "Xã Hùng Châu"
            },
            {
                "maXa": "40337030",
                "tenXa": "Xã Hưng Nguyên"
            },
            {
                "maXa": "40337032",
                "tenXa": "Xã Hưng Nguyên Nam"
            },
            {
                "maXa": "40331100",
                "tenXa": "Xã Hạnh Lâm"
            },
            {
                "maXa": "40325016",
                "tenXa": "Xã Hải Châu"
            },
            {
                "maXa": "40333063",
                "tenXa": "Xã Hải Lộc"
            },
            {
                "maXa": "40323124",
                "tenXa": "Xã Hợp Minh"
            },
            {
                "maXa": "40315114",
                "tenXa": "Xã Hữu Khuông"
            },
            {
                "maXa": "40309035",
                "tenXa": "Xã Hữu Kiệm"
            },
            {
                "maXa": "40309043",
                "tenXa": "Xã Keng Đu"
            },
            {
                "maXa": "40331103",
                "tenXa": "Xã Kim Bảng"
            },
            {
                "maXa": "40335050",
                "tenXa": "Xã Kim Liên"
            },
            {
                "maXa": "40337033",
                "tenXa": "Xã Lam Thành"
            },
            {
                "maXa": "40329026",
                "tenXa": "Xã Lương Sơn"
            },
            {
                "maXa": "40315110",
                "tenXa": "Xã Lượng Minh"
            },
            {
                "maXa": "40325019",
                "tenXa": "Xã Minh Châu"
            },
            {
                "maXa": "40311080",
                "tenXa": "Xã Minh Hợp"
            },
            {
                "maXa": "40321008",
                "tenXa": "Xã Môn Sơn"
            },
            {
                "maXa": "40311079",
                "tenXa": "Xã Mường Chọng"
            },
            {
                "maXa": "40311078",
                "tenXa": "Xã Mường Ham"
            },
            {
                "maXa": "40309045",
                "tenXa": "Xã Mường Lống"
            },
            {
                "maXa": "40305068",
                "tenXa": "Xã Mường Quàng"
            },
            {
                "maXa": "40309039",
                "tenXa": "Xã Mường Típ"
            },
            {
                "maXa": "40309034",
                "tenXa": "Xã Mường Xén"
            },
            {
                "maXa": "40321009",
                "tenXa": "Xã Mậu Thạch"
            },
            {
                "maXa": "40309041",
                "tenXa": "Xã Mỹ Lý"
            },
            {
                "maXa": "40309038",
                "tenXa": "Xã Na Loi"
            },
            {
                "maXa": "40309040",
                "tenXa": "Xã Na Ngoi"
            },
            {
                "maXa": "40335047",
                "tenXa": "Xã Nam Đàn"
            },
            {
                "maXa": "40315113",
                "tenXa": "Xã Nga My"
            },
            {
                "maXa": "40333058",
                "tenXa": "Xã Nghi Lộc"
            },
            {
                "maXa": "40319093",
                "tenXa": "Xã Nghĩa Hành"
            },
            {
                "maXa": "40313055",
                "tenXa": "Xã Nghĩa Hưng"
            },
            {
                "maXa": "40313056",
                "tenXa": "Xã Nghĩa Khánh"
            },
            {
                "maXa": "40313053",
                "tenXa": "Xã Nghĩa Lâm"
            },
            {
                "maXa": "40313057",
                "tenXa": "Xã Nghĩa Lộc"
            },
            {
                "maXa": "40313054",
                "tenXa": "Xã Nghĩa Mai"
            },
            {
                "maXa": "40313052",
                "tenXa": "Xã Nghĩa Thọ"
            },
            {
                "maXa": "40313051",
                "tenXa": "Xã Nghĩa Đàn"
            },
            {
                "maXa": "40319091",
                "tenXa": "Xã Nghĩa Đồng"
            },
            {
                "maXa": "40327003",
                "tenXa": "Xã Nhân Hoà"
            },
            {
                "maXa": "40315115",
                "tenXa": "Xã Nhôn Mai"
            },
            {
                "maXa": "40309036",
                "tenXa": "Xã Nậm Cắn"
            },
            {
                "maXa": "40333059",
                "tenXa": "Xã Phúc Lộc"
            },
            {
                "maXa": "40323123",
                "tenXa": "Xã Quan Thành"
            },
            {
                "maXa": "40323127",
                "tenXa": "Xã Quang Đồng"
            },
            {
                "maXa": "40325015",
                "tenXa": "Xã Quảng Châu"
            },
            {
                "maXa": "40305065",
                "tenXa": "Xã Quế Phong"
            },
            {
                "maXa": "40307070",
                "tenXa": "Xã Quỳ Châu"
            },
            {
                "maXa": "40311074",
                "tenXa": "Xã Quỳ Hợp"
            },
            {
                "maXa": "40317083",
                "tenXa": "Xã Quỳnh Anh"
            },
            {
                "maXa": "40317081",
                "tenXa": "Xã Quỳnh Lưu"
            },
            {
                "maXa": "40317085",
                "tenXa": "Xã Quỳnh Phú"
            },
            {
                "maXa": "40317086",
                "tenXa": "Xã Quỳnh Sơn"
            },
            {
                "maXa": "40317084",
                "tenXa": "Xã Quỳnh Tam"
            },
            {
                "maXa": "40317087",
                "tenXa": "Xã Quỳnh Thắng"
            },
            {
                "maXa": "40317082",
                "tenXa": "Xã Quỳnh Văn"
            },
            {
                "maXa": "40331101",
                "tenXa": "Xã Sơn Lâm"
            },
            {
                "maXa": "40311075",
                "tenXa": "Xã Tam Hợp"
            },
            {
                "maXa": "40315107",
                "tenXa": "Xã Tam Quang"
            },
            {
                "maXa": "40315108",
                "tenXa": "Xã Tam Thái"
            },
            {
                "maXa": "40331099",
                "tenXa": "Xã Tam Đồng"
            },
            {
                "maXa": "40335049",
                "tenXa": "Xã Thiên Nhẫn"
            },
            {
                "maXa": "40329025",
                "tenXa": "Xã Thuần Trung"
            },
            {
                "maXa": "40327006",
                "tenXa": "Xã Thành Bình Thọ"
            },
            {
                "maXa": "40305069",
                "tenXa": "Xã Thông Thụ"
            },
            {
                "maXa": "40333062",
                "tenXa": "Xã Thần Lĩnh"
            },
            {
                "maXa": "40319094",
                "tenXa": "Xã Tiên Đồng"
            },
            {
                "maXa": "40305066",
                "tenXa": "Xã Tiền Phong"
            },
            {
                "maXa": "40305067",
                "tenXa": "Xã Tri Lễ"
            },
            {
                "maXa": "40333061",
                "tenXa": "Xã Trung Lộc"
            },
            {
                "maXa": "40319090",
                "tenXa": "Xã Tân An"
            },
            {
                "maXa": "40325017",
                "tenXa": "Xã Tân Châu"
            },
            {
                "maXa": "40319088",
                "tenXa": "Xã Tân Kỳ"
            },
            {
                "maXa": "40319089",
                "tenXa": "Xã Tân Phú"
            },
            {
                "maXa": "40315109",
                "tenXa": "Xã Tương Dương"
            },
            {
                "maXa": "40323126",
                "tenXa": "Xã Vân Du"
            },
            {
                "maXa": "40323125",
                "tenXa": "Xã Vân Tụ"
            },
            {
                "maXa": "40329023",
                "tenXa": "Xã Văn Hiến"
            },
            {
                "maXa": "40333064",
                "tenXa": "Xã Văn Kiều"
            },
            {
                "maXa": "40327005",
                "tenXa": "Xã Vĩnh Tường"
            },
            {
                "maXa": "40335046",
                "tenXa": "Xã Vạn An"
            },
            {
                "maXa": "40331106",
                "tenXa": "Xã Xuân Lâm"
            },
            {
                "maXa": "40315112",
                "tenXa": "Xã Yên Hoà"
            },
            {
                "maXa": "40315111",
                "tenXa": "Xã Yên Na"
            },
            {
                "maXa": "40323122",
                "tenXa": "Xã Yên Thành"
            },
            {
                "maXa": "40337031",
                "tenXa": "Xã Yên Trung"
            },
            {
                "maXa": "40327002",
                "tenXa": "Xã Yên Xuân"
            },
            {
                "maXa": "40329021",
                "tenXa": "Xã Đô Lương"
            },
            {
                "maXa": "40314097",
                "tenXa": "Xã Đông Hiếu"
            },
            {
                "maXa": "40333060",
                "tenXa": "Xã Đông Lộc"
            },
            {
                "maXa": "40323130",
                "tenXa": "Xã Đông Thành"
            },
            {
                "maXa": "40335048",
                "tenXa": "Xã Đại Huệ"
            },
            {
                "maXa": "40331105",
                "tenXa": "Xã Đại Đồng"
            },
            {
                "maXa": "40325014",
                "tenXa": "Xã Đức Châu"
            }
        ]
    },
    {
        "maThanhPho": "06",
        "thanhPho": "Tỉnh Ninh Bình",
        "xaPhuong": [
            {
                "maXa": "11101109",
                "tenXa": "Phường Châu Sơn"
            },
            {
                "maXa": "11103114",
                "tenXa": "Phường Duy Hà"
            },
            {
                "maXa": "11103111",
                "tenXa": "Phường Duy Tiên"
            },
            {
                "maXa": "11103112",
                "tenXa": "Phường Duy Tân"
            },
            {
                "maXa": "11709099",
                "tenXa": "Phường Hoa Lư"
            },
            {
                "maXa": "11101106",
                "tenXa": "Phường Hà Nam"
            },
            {
                "maXa": "11309128",
                "tenXa": "Phường Hồng Quang"
            },
            {
                "maXa": "11105121",
                "tenXa": "Phường Kim Bảng"
            },
            {
                "maXa": "11105119",
                "tenXa": "Phường Kim Thanh"
            },
            {
                "maXa": "11101110",
                "tenXa": "Phường Liêm Tuyền"
            },
            {
                "maXa": "11105116",
                "tenXa": "Phường Lê Hồ"
            },
            {
                "maXa": "11105118",
                "tenXa": "Phường Lý Thường Kiệt"
            },
            {
                "maXa": "11301129",
                "tenXa": "Phường Mỹ Lộc"
            },
            {
                "maXa": "11709100",
                "tenXa": "Phường Nam Hoa Lư"
            },
            {
                "maXa": "11301122",
                "tenXa": "Phường Nam Định"
            },
            {
                "maXa": "11105117",
                "tenXa": "Phường Nguyễn Úy"
            },
            {
                "maXa": "11101108",
                "tenXa": "Phường Phù Vân"
            },
            {
                "maXa": "11101107",
                "tenXa": "Phường Phủ Lý"
            },
            {
                "maXa": "11105120",
                "tenXa": "Phường Tam Chúc"
            },
            {
                "maXa": "11703102",
                "tenXa": "Phường Tam Điệp"
            },
            {
                "maXa": "11301123",
                "tenXa": "Phường Thiên Trường"
            },
            {
                "maXa": "11301126",
                "tenXa": "Phường Thành Nam"
            },
            {
                "maXa": "11103115",
                "tenXa": "Phường Tiên Sơn"
            },
            {
                "maXa": "11703104",
                "tenXa": "Phường Trung Sơn"
            },
            {
                "maXa": "11301127",
                "tenXa": "Phường Trường Thi"
            },
            {
                "maXa": "11709098",
                "tenXa": "Phường Tây Hoa Lư"
            },
            {
                "maXa": "11301125",
                "tenXa": "Phường Vị Khê"
            },
            {
                "maXa": "11703103",
                "tenXa": "Phường Yên Sơn"
            },
            {
                "maXa": "11703105",
                "tenXa": "Phường Yên Thắng"
            },
            {
                "maXa": "11301124",
                "tenXa": "Phường Đông A"
            },
            {
                "maXa": "11713101",
                "tenXa": "Phường Đông Hoa Lư"
            },
            {
                "maXa": "11103113",
                "tenXa": "Phường Đồng Văn"
            },
            {
                "maXa": "11111034",
                "tenXa": "Xã Bình An"
            },
            {
                "maXa": "11111035",
                "tenXa": "Xã Bình Giang"
            },
            {
                "maXa": "11111032",
                "tenXa": "Xã Bình Lục"
            },
            {
                "maXa": "11715030",
                "tenXa": "Xã Bình Minh"
            },
            {
                "maXa": "11111033",
                "tenXa": "Xã Bình Mỹ"
            },
            {
                "maXa": "11111036",
                "tenXa": "Xã Bình Sơn"
            },
            {
                "maXa": "11107044",
                "tenXa": "Xã Bắc Lý"
            },
            {
                "maXa": "11715024",
                "tenXa": "Xã Chất Bình"
            },
            {
                "maXa": "11311067",
                "tenXa": "Xã Cát Thành"
            },
            {
                "maXa": "11705011",
                "tenXa": "Xã Cúc Phương"
            },
            {
                "maXa": "11311065",
                "tenXa": "Xã Cổ Lễ"
            },
            {
                "maXa": "11707003",
                "tenXa": "Xã Gia Hưng"
            },
            {
                "maXa": "11705008",
                "tenXa": "Xã Gia Lâm"
            },
            {
                "maXa": "11707004",
                "tenXa": "Xã Gia Phong"
            },
            {
                "maXa": "11707006",
                "tenXa": "Xã Gia Trấn"
            },
            {
                "maXa": "11705009",
                "tenXa": "Xã Gia Tường"
            },
            {
                "maXa": "11707001",
                "tenXa": "Xã Gia Viễn"
            },
            {
                "maXa": "11707005",
                "tenXa": "Xã Gia Vân"
            },
            {
                "maXa": "11315089",
                "tenXa": "Xã Giao Bình"
            },
            {
                "maXa": "11315085",
                "tenXa": "Xã Giao Hoà"
            },
            {
                "maXa": "11315088",
                "tenXa": "Xã Giao Hưng"
            },
            {
                "maXa": "11315084",
                "tenXa": "Xã Giao Minh"
            },
            {
                "maXa": "11315090",
                "tenXa": "Xã Giao Ninh"
            },
            {
                "maXa": "11315087",
                "tenXa": "Xã Giao Phúc"
            },
            {
                "maXa": "11315086",
                "tenXa": "Xã Giao Thuỷ"
            },
            {
                "maXa": "11303055",
                "tenXa": "Xã Hiển Khánh"
            },
            {
                "maXa": "11319080",
                "tenXa": "Xã Hải An"
            },
            {
                "maXa": "11319077",
                "tenXa": "Xã Hải Anh"
            },
            {
                "maXa": "11319079",
                "tenXa": "Xã Hải Hưng"
            },
            {
                "maXa": "11319076",
                "tenXa": "Xã Hải Hậu"
            },
            {
                "maXa": "11319081",
                "tenXa": "Xã Hải Quang"
            },
            {
                "maXa": "11319083",
                "tenXa": "Xã Hải Thịnh"
            },
            {
                "maXa": "11319078",
                "tenXa": "Xã Hải Tiến"
            },
            {
                "maXa": "11319082",
                "tenXa": "Xã Hải Xuân"
            },
            {
                "maXa": "11317094",
                "tenXa": "Xã Hồng Phong"
            },
            {
                "maXa": "11713018",
                "tenXa": "Xã Khánh Hội"
            },
            {
                "maXa": "11713016",
                "tenXa": "Xã Khánh Nhạc"
            },
            {
                "maXa": "11713017",
                "tenXa": "Xã Khánh Thiện"
            },
            {
                "maXa": "11713019",
                "tenXa": "Xã Khánh Trung"
            },
            {
                "maXa": "11715025",
                "tenXa": "Xã Kim Sơn"
            },
            {
                "maXa": "11715031",
                "tenXa": "Xã Kim Đông"
            },
            {
                "maXa": "11715028",
                "tenXa": "Xã Lai Thành"
            },
            {
                "maXa": "11109037",
                "tenXa": "Xã Liêm Hà"
            },
            {
                "maXa": "11303057",
                "tenXa": "Xã Liên Minh"
            },
            {
                "maXa": "11107042",
                "tenXa": "Xã Lý Nhân"
            },
            {
                "maXa": "11311070",
                "tenXa": "Xã Minh Thái"
            },
            {
                "maXa": "11303054",
                "tenXa": "Xã Minh Tân"
            },
            {
                "maXa": "11309053",
                "tenXa": "Xã Nam Hồng"
            },
            {
                "maXa": "11107048",
                "tenXa": "Xã Nam Lý"
            },
            {
                "maXa": "11309050",
                "tenXa": "Xã Nam Minh"
            },
            {
                "maXa": "11309052",
                "tenXa": "Xã Nam Ninh"
            },
            {
                "maXa": "11309049",
                "tenXa": "Xã Nam Trực"
            },
            {
                "maXa": "11107043",
                "tenXa": "Xã Nam Xang"
            },
            {
                "maXa": "11309051",
                "tenXa": "Xã Nam Đồng"
            },
            {
                "maXa": "11317092",
                "tenXa": "Xã Nghĩa Hưng"
            },
            {
                "maXa": "11317096",
                "tenXa": "Xã Nghĩa Lâm"
            },
            {
                "maXa": "11317093",
                "tenXa": "Xã Nghĩa Sơn"
            },
            {
                "maXa": "11705007",
                "tenXa": "Xã Nho Quan"
            },
            {
                "maXa": "11107047",
                "tenXa": "Xã Nhân Hà"
            },
            {
                "maXa": "11311071",
                "tenXa": "Xã Ninh Cường"
            },
            {
                "maXa": "11311066",
                "tenXa": "Xã Ninh Giang"
            },
            {
                "maXa": "11307064",
                "tenXa": "Xã Phong Doanh"
            },
            {
                "maXa": "11715027",
                "tenXa": "Xã Phát Diệm"
            },
            {
                "maXa": "11705012",
                "tenXa": "Xã Phú Long"
            },
            {
                "maXa": "11705010",
                "tenXa": "Xã Phú Sơn"
            },
            {
                "maXa": "11311069",
                "tenXa": "Xã Quang Hưng"
            },
            {
                "maXa": "11715026",
                "tenXa": "Xã Quang Thiện"
            },
            {
                "maXa": "11705014",
                "tenXa": "Xã Quỳnh Lưu"
            },
            {
                "maXa": "11317095",
                "tenXa": "Xã Quỹ Nhất"
            },
            {
                "maXa": "11317097",
                "tenXa": "Xã Rạng Đông"
            },
            {
                "maXa": "11109039",
                "tenXa": "Xã Thanh Bình"
            },
            {
                "maXa": "11109041",
                "tenXa": "Xã Thanh Liêm"
            },
            {
                "maXa": "11109040",
                "tenXa": "Xã Thanh Lâm"
            },
            {
                "maXa": "11705013",
                "tenXa": "Xã Thanh Sơn"
            },
            {
                "maXa": "11107046",
                "tenXa": "Xã Trần Thương"
            },
            {
                "maXa": "11311068",
                "tenXa": "Xã Trực Ninh"
            },
            {
                "maXa": "11307063",
                "tenXa": "Xã Tân Minh"
            },
            {
                "maXa": "11109038",
                "tenXa": "Xã Tân Thanh"
            },
            {
                "maXa": "11107045",
                "tenXa": "Xã Vĩnh Trụ"
            },
            {
                "maXa": "11307062",
                "tenXa": "Xã Vũ Dương"
            },
            {
                "maXa": "11307061",
                "tenXa": "Xã Vạn Thắng"
            },
            {
                "maXa": "11303056",
                "tenXa": "Xã Vụ Bản"
            },
            {
                "maXa": "11313074",
                "tenXa": "Xã Xuân Giang"
            },
            {
                "maXa": "11313073",
                "tenXa": "Xã Xuân Hưng"
            },
            {
                "maXa": "11313075",
                "tenXa": "Xã Xuân Hồng"
            },
            {
                "maXa": "11313072",
                "tenXa": "Xã Xuân Trường"
            },
            {
                "maXa": "11307060",
                "tenXa": "Xã Yên Cường"
            },
            {
                "maXa": "11713015",
                "tenXa": "Xã Yên Khánh"
            },
            {
                "maXa": "11711020",
                "tenXa": "Xã Yên Mô"
            },
            {
                "maXa": "11711022",
                "tenXa": "Xã Yên Mạc"
            },
            {
                "maXa": "11711021",
                "tenXa": "Xã Yên Từ"
            },
            {
                "maXa": "11307059",
                "tenXa": "Xã Yên Đồng"
            },
            {
                "maXa": "11307058",
                "tenXa": "Xã Ý Yên"
            },
            {
                "maXa": "11707002",
                "tenXa": "Xã Đại Hoàng"
            },
            {
                "maXa": "11715029",
                "tenXa": "Xã Định Hóa"
            },
            {
                "maXa": "11711023",
                "tenXa": "Xã Đồng Thái"
            },
            {
                "maXa": "11317091",
                "tenXa": "Xã Đồng Thịnh"
            }
        ]
    },
    {
        "maThanhPho": "12",
        "thanhPho": "Tỉnh Phú Thọ",
        "xaPhuong": [
            {
                "maXa": "30501145",
                "tenXa": "Phường Hoà Bình"
            },
            {
                "maXa": "30501146",
                "tenXa": "Phường Kỳ Sơn"
            },
            {
                "maXa": "21701002",
                "tenXa": "Phường Nông Trang"
            },
            {
                "maXa": "21703010",
                "tenXa": "Phường Phong Châu"
            },
            {
                "maXa": "21703011",
                "tenXa": "Phường Phú Thọ"
            },
            {
                "maXa": "21902101",
                "tenXa": "Phường Phúc Yên"
            },
            {
                "maXa": "21701003",
                "tenXa": "Phường Thanh Miếu"
            },
            {
                "maXa": "30501148",
                "tenXa": "Phường Thống Nhất"
            },
            {
                "maXa": "30501147",
                "tenXa": "Phường Tân Hoà"
            },
            {
                "maXa": "21701001",
                "tenXa": "Phường Việt Trì"
            },
            {
                "maXa": "21701004",
                "tenXa": "Phường Vân Phú"
            },
            {
                "maXa": "21901099",
                "tenXa": "Phường Vĩnh Phúc"
            },
            {
                "maXa": "21901100",
                "tenXa": "Phường Vĩnh Yên"
            },
            {
                "maXa": "21902102",
                "tenXa": "Phường Xuân Hòa"
            },
            {
                "maXa": "21703012",
                "tenXa": "Phường Âu Cơ"
            },
            {
                "maXa": "30517126",
                "tenXa": "Xã An Bình"
            },
            {
                "maXa": "30517127",
                "tenXa": "Xã An Nghĩa"
            },
            {
                "maXa": "30505132",
                "tenXa": "Xã Bao La"
            },
            {
                "maXa": "21913095",
                "tenXa": "Xã Bình Nguyên"
            },
            {
                "maXa": "21711017",
                "tenXa": "Xã Bình Phú"
            },
            {
                "maXa": "21913098",
                "tenXa": "Xã Bình Tuyền"
            },
            {
                "maXa": "21913097",
                "tenXa": "Xã Bình Xuyên"
            },
            {
                "maXa": "21721009",
                "tenXa": "Xã Bản Nguyên"
            },
            {
                "maXa": "21705028",
                "tenXa": "Xã Bằng Luân"
            },
            {
                "maXa": "30509129",
                "tenXa": "Xã Cao Dương"
            },
            {
                "maXa": "30510103",
                "tenXa": "Xã Cao Phong"
            },
            {
                "maXa": "30503107",
                "tenXa": "Xã Cao Sơn"
            },
            {
                "maXa": "21705026",
                "tenXa": "Xã Chân Mộng"
            },
            {
                "maXa": "21709022",
                "tenXa": "Xã Chí Tiên"
            },
            {
                "maXa": "21705027",
                "tenXa": "Xã Chí Đám"
            },
            {
                "maXa": "21713035",
                "tenXa": "Xã Cẩm Khê"
            },
            {
                "maXa": "21719051",
                "tenXa": "Xã Cự Đồng"
            },
            {
                "maXa": "21711014",
                "tenXa": "Xã Dân Chủ"
            },
            {
                "maXa": "30511114",
                "tenXa": "Xã Dũng Tiến"
            },
            {
                "maXa": "21707034",
                "tenXa": "Xã Hiền Lương"
            },
            {
                "maXa": "21717044",
                "tenXa": "Xã Hiền Quan"
            },
            {
                "maXa": "21905082",
                "tenXa": "Xã Hoàng An"
            },
            {
                "maXa": "21709020",
                "tenXa": "Xã Hoàng Cương"
            },
            {
                "maXa": "21701005",
                "tenXa": "Xã Hy Cương"
            },
            {
                "maXa": "21713037",
                "tenXa": "Xã Hùng Việt"
            },
            {
                "maXa": "21719052",
                "tenXa": "Xã Hương Cần"
            },
            {
                "maXa": "21707029",
                "tenXa": "Xã Hạ Hòa"
            },
            {
                "maXa": "21915069",
                "tenXa": "Xã Hải Lựu"
            },
            {
                "maXa": "21905081",
                "tenXa": "Xã Hội Thịnh"
            },
            {
                "maXa": "30511115",
                "tenXa": "Xã Hợp Kim"
            },
            {
                "maXa": "21903075",
                "tenXa": "Xã Hợp Lý"
            },
            {
                "maXa": "21719054",
                "tenXa": "Xã Khả Cửu"
            },
            {
                "maXa": "30511112",
                "tenXa": "Xã Kim Bôi"
            },
            {
                "maXa": "21720057",
                "tenXa": "Xã Lai Đồng"
            },
            {
                "maXa": "21909092",
                "tenXa": "Xã Liên Châu"
            },
            {
                "maXa": "21903074",
                "tenXa": "Xã Liên Hòa"
            },
            {
                "maXa": "21709023",
                "tenXa": "Xã Liên Minh"
            },
            {
                "maXa": "30509130",
                "tenXa": "Xã Liên Sơn"
            },
            {
                "maXa": "21720060",
                "tenXa": "Xã Long Cốc"
            },
            {
                "maXa": "21721006",
                "tenXa": "Xã Lâm Thao"
            },
            {
                "maXa": "30509128",
                "tenXa": "Xã Lương Sơn"
            },
            {
                "maXa": "30519142",
                "tenXa": "Xã Lạc Lương"
            },
            {
                "maXa": "30515117",
                "tenXa": "Xã Lạc Sơn"
            },
            {
                "maXa": "30517125",
                "tenXa": "Xã Lạc Thủy"
            },
            {
                "maXa": "21903071",
                "tenXa": "Xã Lập Thạch"
            },
            {
                "maXa": "30505131",
                "tenXa": "Xã Mai Châu"
            },
            {
                "maXa": "30505133",
                "tenXa": "Xã Mai Hạ"
            },
            {
                "maXa": "21715065",
                "tenXa": "Xã Minh Hòa"
            },
            {
                "maXa": "21720056",
                "tenXa": "Xã Minh Đài"
            },
            {
                "maXa": "30513137",
                "tenXa": "Xã Mường Bi"
            },
            {
                "maXa": "30513138",
                "tenXa": "Xã Mường Hoa"
            },
            {
                "maXa": "30510104",
                "tenXa": "Xã Mường Thàng"
            },
            {
                "maXa": "30515118",
                "tenXa": "Xã Mường Vang"
            },
            {
                "maXa": "30511113",
                "tenXa": "Xã Mường Động"
            },
            {
                "maXa": "21909094",
                "tenXa": "Xã Nguyệt Đức"
            },
            {
                "maXa": "30515120",
                "tenXa": "Xã Ngọc Sơn"
            },
            {
                "maXa": "30515121",
                "tenXa": "Xã Nhân Nghĩa"
            },
            {
                "maXa": "30511116",
                "tenXa": "Xã Nật Sơn"
            },
            {
                "maXa": "21711013",
                "tenXa": "Xã Phù Ninh"
            },
            {
                "maXa": "21721008",
                "tenXa": "Xã Phùng Nguyên"
            },
            {
                "maXa": "21713036",
                "tenXa": "Xã Phú Khê"
            },
            {
                "maXa": "21711015",
                "tenXa": "Xã Phú Mỹ"
            },
            {
                "maXa": "30505134",
                "tenXa": "Xã Pà Cò"
            },
            {
                "maXa": "30503109",
                "tenXa": "Xã Quy Đức"
            },
            {
                "maXa": "30515122",
                "tenXa": "Xã Quyết Thắng"
            },
            {
                "maXa": "21709019",
                "tenXa": "Xã Quảng Yên"
            },
            {
                "maXa": "21915068",
                "tenXa": "Xã Sông Lô"
            },
            {
                "maXa": "21715063",
                "tenXa": "Xã Sơn Lương"
            },
            {
                "maXa": "21903076",
                "tenXa": "Xã Sơn Đông"
            },
            {
                "maXa": "21905080",
                "tenXa": "Xã Tam Dương"
            },
            {
                "maXa": "21905083",
                "tenXa": "Xã Tam Dương Bắc"
            },
            {
                "maXa": "21909093",
                "tenXa": "Xã Tam Hồng"
            },
            {
                "maXa": "21717041",
                "tenXa": "Xã Tam Nông"
            },
            {
                "maXa": "21915067",
                "tenXa": "Xã Tam Sơn"
            },
            {
                "maXa": "21904077",
                "tenXa": "Xã Tam Đảo"
            },
            {
                "maXa": "21709018",
                "tenXa": "Xã Thanh Ba"
            },
            {
                "maXa": "21719048",
                "tenXa": "Xã Thanh Sơn"
            },
            {
                "maXa": "21723045",
                "tenXa": "Xã Thanh Thuỷ"
            },
            {
                "maXa": "21720058",
                "tenXa": "Xã Thu Cúc"
            },
            {
                "maXa": "30510105",
                "tenXa": "Xã Thung Nai"
            },
            {
                "maXa": "21903073",
                "tenXa": "Xã Thái Hòa"
            },
            {
                "maXa": "30515123",
                "tenXa": "Xã Thượng Cốc"
            },
            {
                "maXa": "21715062",
                "tenXa": "Xã Thượng Long"
            },
            {
                "maXa": "30501144",
                "tenXa": "Xã Thịnh Minh"
            },
            {
                "maXa": "21717042",
                "tenXa": "Xã Thọ Văn"
            },
            {
                "maXa": "21907085",
                "tenXa": "Xã Thổ Tang"
            },
            {
                "maXa": "21713039",
                "tenXa": "Xã Tiên Lương"
            },
            {
                "maXa": "21903072",
                "tenXa": "Xã Tiên Lữ"
            },
            {
                "maXa": "30503111",
                "tenXa": "Xã Tiền Phong"
            },
            {
                "maXa": "30513139",
                "tenXa": "Xã Toàn Thắng"
            },
            {
                "maXa": "21715066",
                "tenXa": "Xã Trung Sơn"
            },
            {
                "maXa": "21711016",
                "tenXa": "Xã Trạm Thản"
            },
            {
                "maXa": "21723047",
                "tenXa": "Xã Tu Vũ"
            },
            {
                "maXa": "30513136",
                "tenXa": "Xã Tân Lạc"
            },
            {
                "maXa": "30505135",
                "tenXa": "Xã Tân Mai"
            },
            {
                "maXa": "30503110",
                "tenXa": "Xã Tân Pheo"
            },
            {
                "maXa": "21720055",
                "tenXa": "Xã Tân Sơn"
            },
            {
                "maXa": "21705025",
                "tenXa": "Xã Tây Cốc"
            },
            {
                "maXa": "21909091",
                "tenXa": "Xã Tề Lỗ"
            },
            {
                "maXa": "21713040",
                "tenXa": "Xã Vân Bán"
            },
            {
                "maXa": "30513140",
                "tenXa": "Xã Vân Sơn"
            },
            {
                "maXa": "21719049",
                "tenXa": "Xã Võ Miếu"
            },
            {
                "maXa": "21707033",
                "tenXa": "Xã Văn Lang"
            },
            {
                "maXa": "21719050",
                "tenXa": "Xã Văn Miếu"
            },
            {
                "maXa": "21907087",
                "tenXa": "Xã Vĩnh An"
            },
            {
                "maXa": "21707032",
                "tenXa": "Xã Vĩnh Chân"
            },
            {
                "maXa": "21907086",
                "tenXa": "Xã Vĩnh Hưng"
            },
            {
                "maXa": "21907088",
                "tenXa": "Xã Vĩnh Phú"
            },
            {
                "maXa": "21907089",
                "tenXa": "Xã Vĩnh Thành"
            },
            {
                "maXa": "21907084",
                "tenXa": "Xã Vĩnh Tường"
            },
            {
                "maXa": "21717043",
                "tenXa": "Xã Vạn Xuân"
            },
            {
                "maXa": "21913096",
                "tenXa": "Xã Xuân Lãng"
            },
            {
                "maXa": "21721007",
                "tenXa": "Xã Xuân Lũng"
            },
            {
                "maXa": "21715064",
                "tenXa": "Xã Xuân Viên"
            },
            {
                "maXa": "21720059",
                "tenXa": "Xã Xuân Đài"
            },
            {
                "maXa": "21707031",
                "tenXa": "Xã Yên Kỳ"
            },
            {
                "maXa": "21915070",
                "tenXa": "Xã Yên Lãng"
            },
            {
                "maXa": "21909090",
                "tenXa": "Xã Yên Lạc"
            },
            {
                "maXa": "21715061",
                "tenXa": "Xã Yên Lập"
            },
            {
                "maXa": "30515124",
                "tenXa": "Xã Yên Phú"
            },
            {
                "maXa": "21719053",
                "tenXa": "Xã Yên Sơn"
            },
            {
                "maXa": "30519141",
                "tenXa": "Xã Yên Thủy"
            },
            {
                "maXa": "30519143",
                "tenXa": "Xã Yên Trị"
            },
            {
                "maXa": "21707030",
                "tenXa": "Xã Đan Thượng"
            },
            {
                "maXa": "21705024",
                "tenXa": "Xã Đoan Hùng"
            },
            {
                "maXa": "30503106",
                "tenXa": "Xã Đà Bắc"
            },
            {
                "maXa": "21723046",
                "tenXa": "Xã Đào Xá"
            },
            {
                "maXa": "21709021",
                "tenXa": "Xã Đông Thành"
            },
            {
                "maXa": "21904078",
                "tenXa": "Xã Đại Đình"
            },
            {
                "maXa": "30515119",
                "tenXa": "Xã Đại Đồng"
            },
            {
                "maXa": "21904079",
                "tenXa": "Xã Đạo Trù"
            },
            {
                "maXa": "21713038",
                "tenXa": "Xã Đồng Lương"
            },
            {
                "maXa": "30503108",
                "tenXa": "Xã Đức Nhàn"
            }
        ]
    },
    {
        "maThanhPho": "22",
        "thanhPho": "Tỉnh Quảng Ngãi",
        "xaPhuong": [
            {
                "maXa": "50501004",
                "tenXa": "Phường Cẩm Thành"
            },
            {
                "maXa": "60101057",
                "tenXa": "Phường Kon Tum"
            },
            {
                "maXa": "50501005",
                "tenXa": "Phường Nghĩa Lộ"
            },
            {
                "maXa": "50523010",
                "tenXa": "Phường Sa Huỳnh"
            },
            {
                "maXa": "50523006",
                "tenXa": "Phường Trà Câu"
            },
            {
                "maXa": "50501002",
                "tenXa": "Phường Trương Quang Trọng"
            },
            {
                "maXa": "60101059",
                "tenXa": "Phường Đăk BLa"
            },
            {
                "maXa": "60101058",
                "tenXa": "Phường Đăk Cấm"
            },
            {
                "maXa": "50523008",
                "tenXa": "Phường Đức Phổ"
            },
            {
                "maXa": "50501003",
                "tenXa": "Xã An Phú"
            },
            {
                "maXa": "50525050",
                "tenXa": "Xã Ba Dinh"
            },
            {
                "maXa": "50509017",
                "tenXa": "Xã Ba Gia"
            },
            {
                "maXa": "50525049",
                "tenXa": "Xã Ba Tô"
            },
            {
                "maXa": "50525051",
                "tenXa": "Xã Ba Tơ"
            },
            {
                "maXa": "50525052",
                "tenXa": "Xã Ba Vinh"
            },
            {
                "maXa": "50525048",
                "tenXa": "Xã Ba Vì"
            },
            {
                "maXa": "50525055",
                "tenXa": "Xã Ba Xa"
            },
            {
                "maXa": "50525053",
                "tenXa": "Xã Ba Động"
            },
            {
                "maXa": "50505012",
                "tenXa": "Xã Bình Chương"
            },
            {
                "maXa": "50505011",
                "tenXa": "Xã Bình Minh"
            },
            {
                "maXa": "50505013",
                "tenXa": "Xã Bình Sơn"
            },
            {
                "maXa": "60105075",
                "tenXa": "Xã Bờ Y"
            },
            {
                "maXa": "50507036",
                "tenXa": "Xã Cà Đam"
            },
            {
                "maXa": "60105077",
                "tenXa": "Xã Dục Nông"
            },
            {
                "maXa": "60101061",
                "tenXa": "Xã Ia Chim"
            },
            {
                "maXa": "60114086",
                "tenXa": "Xã Ia Tơi"
            },
            {
                "maXa": "60114096",
                "tenXa": "Xã Ia Đal"
            },
            {
                "maXa": "50523009",
                "tenXa": "Xã Khánh Cường"
            },
            {
                "maXa": "60108088",
                "tenXa": "Xã Kon Braih"
            },
            {
                "maXa": "60109092",
                "tenXa": "Xã Kon Plông"
            },
            {
                "maXa": "60107070",
                "tenXa": "Xã Kon Đào"
            },
            {
                "maXa": "50521028",
                "tenXa": "Xã Long Phụng"
            },
            {
                "maXa": "50521031",
                "tenXa": "Xã Lân Phong"
            },
            {
                "maXa": "50519046",
                "tenXa": "Xã Minh Long"
            },
            {
                "maXa": "50521029",
                "tenXa": "Xã Mỏ Cày"
            },
            {
                "maXa": "60113095",
                "tenXa": "Xã Mô Rai"
            },
            {
                "maXa": "60109091",
                "tenXa": "Xã Măng Bút"
            },
            {
                "maXa": "60115074",
                "tenXa": "Xã Măng Ri"
            },
            {
                "maXa": "60109090",
                "tenXa": "Xã Măng Đen"
            },
            {
                "maXa": "50521030",
                "tenXa": "Xã Mộ Đức"
            },
            {
                "maXa": "50515022",
                "tenXa": "Xã Nghĩa Giang"
            },
            {
                "maXa": "50517024",
                "tenXa": "Xã Nghĩa Hành"
            },
            {
                "maXa": "50523007",
                "tenXa": "Xã Nguyễn Nghiêm"
            },
            {
                "maXa": "60103079",
                "tenXa": "Xã Ngọc Linh"
            },
            {
                "maXa": "60101060",
                "tenXa": "Xã Ngọk Bay"
            },
            {
                "maXa": "60111066",
                "tenXa": "Xã Ngọk Réo"
            },
            {
                "maXa": "60107068",
                "tenXa": "Xã Ngọk Tụ"
            },
            {
                "maXa": "50517027",
                "tenXa": "Xã Phước Giang"
            },
            {
                "maXa": "60113094",
                "tenXa": "Xã Rờ Kơi"
            },
            {
                "maXa": "60113084",
                "tenXa": "Xã Sa Bình"
            },
            {
                "maXa": "60105076",
                "tenXa": "Xã Sa Loong"
            },
            {
                "maXa": "60113083",
                "tenXa": "Xã Sa Thầy"
            },
            {
                "maXa": "50513040",
                "tenXa": "Xã Sơn Hà"
            },
            {
                "maXa": "50513038",
                "tenXa": "Xã Sơn Hạ"
            },
            {
                "maXa": "50513042",
                "tenXa": "Xã Sơn Kỳ"
            },
            {
                "maXa": "50513039",
                "tenXa": "Xã Sơn Linh"
            },
            {
                "maXa": "50519047",
                "tenXa": "Xã Sơn Mai"
            },
            {
                "maXa": "50513041",
                "tenXa": "Xã Sơn Thủy"
            },
            {
                "maXa": "50511043",
                "tenXa": "Xã Sơn Tây"
            },
            {
                "maXa": "50511045",
                "tenXa": "Xã Sơn Tây Hạ"
            },
            {
                "maXa": "50511044",
                "tenXa": "Xã Sơn Tây Thượng"
            },
            {
                "maXa": "50509018",
                "tenXa": "Xã Sơn Tịnh"
            },
            {
                "maXa": "50507035",
                "tenXa": "Xã Thanh Bồng"
            },
            {
                "maXa": "50517026",
                "tenXa": "Xã Thiện Tín"
            },
            {
                "maXa": "50509019",
                "tenXa": "Xã Thọ Phong"
            },
            {
                "maXa": "50507032",
                "tenXa": "Xã Trà Bồng"
            },
            {
                "maXa": "50515023",
                "tenXa": "Xã Trà Giang"
            },
            {
                "maXa": "50509016",
                "tenXa": "Xã Trường Giang"
            },
            {
                "maXa": "60115073",
                "tenXa": "Xã Tu Mơ Rông"
            },
            {
                "maXa": "50507034",
                "tenXa": "Xã Tây Trà"
            },
            {
                "maXa": "50507037",
                "tenXa": "Xã Tây Trà Bồng"
            },
            {
                "maXa": "50515020",
                "tenXa": "Xã Tư Nghĩa"
            },
            {
                "maXa": "50501001",
                "tenXa": "Xã Tịnh Khê"
            },
            {
                "maXa": "50505014",
                "tenXa": "Xã Vạn Tường"
            },
            {
                "maXa": "50515021",
                "tenXa": "Xã Vệ Giang"
            },
            {
                "maXa": "60103078",
                "tenXa": "Xã Xốp"
            },
            {
                "maXa": "60113085",
                "tenXa": "Xã Ya Ly"
            },
            {
                "maXa": "50517025",
                "tenXa": "Xã Đình Cương"
            },
            {
                "maXa": "50505015",
                "tenXa": "Xã Đông Sơn"
            },
            {
                "maXa": "50507033",
                "tenXa": "Xã Đông Trà Bồng"
            },
            {
                "maXa": "60111067",
                "tenXa": "Xã Đăk Hà"
            },
            {
                "maXa": "60108087",
                "tenXa": "Xã Đăk Kôi"
            },
            {
                "maXa": "60103093",
                "tenXa": "Xã Đăk Long"
            },
            {
                "maXa": "60111064",
                "tenXa": "Xã Đăk Mar"
            },
            {
                "maXa": "60103082",
                "tenXa": "Xã Đăk Môn"
            },
            {
                "maXa": "60103080",
                "tenXa": "Xã Đăk Plô"
            },
            {
                "maXa": "60111063",
                "tenXa": "Xã Đăk Pxi"
            },
            {
                "maXa": "60103081",
                "tenXa": "Xã Đăk Pék"
            },
            {
                "maXa": "60108089",
                "tenXa": "Xã Đăk Rve"
            },
            {
                "maXa": "60101062",
                "tenXa": "Xã Đăk Rơ Wa"
            },
            {
                "maXa": "60115071",
                "tenXa": "Xã Đăk Sao"
            },
            {
                "maXa": "60107069",
                "tenXa": "Xã Đăk Tô"
            },
            {
                "maXa": "60115072",
                "tenXa": "Xã Đăk Tờ Kan"
            },
            {
                "maXa": "60111065",
                "tenXa": "Xã Đăk Ui"
            },
            {
                "maXa": "50525054",
                "tenXa": "Xã Đặng Thùy Trâm"
            },
            {
                "maXa": "50503056",
                "tenXa": "Đặc khu Lý Sơn"
            }
        ]
    },
    {
        "maThanhPho": "03",
        "thanhPho": "Tỉnh Quảng Ninh",
        "xaPhuong": [
            {
                "maXa": "22521001",
                "tenXa": "Phường An Sinh"
            },
            {
                "maXa": "22501017",
                "tenXa": "Phường Bãi Cháy"
            },
            {
                "maXa": "22521003",
                "tenXa": "Phường Bình Khê"
            },
            {
                "maXa": "22501020",
                "tenXa": "Phường Cao Xanh"
            },
            {
                "maXa": "22503028",
                "tenXa": "Phường Cẩm Phả"
            },
            {
                "maXa": "22503029",
                "tenXa": "Phường Cửa Ông"
            },
            {
                "maXa": "22525010",
                "tenXa": "Phường Hiệp Hoà"
            },
            {
                "maXa": "22521005",
                "tenXa": "Phường Hoàng Quế"
            },
            {
                "maXa": "22501023",
                "tenXa": "Phường Hoành Bồ"
            },
            {
                "maXa": "22525012",
                "tenXa": "Phường Hà An"
            },
            {
                "maXa": "22501019",
                "tenXa": "Phường Hà Lầm"
            },
            {
                "maXa": "22501018",
                "tenXa": "Phường Hà Tu"
            },
            {
                "maXa": "22501022",
                "tenXa": "Phường Hạ Long"
            },
            {
                "maXa": "22501021",
                "tenXa": "Phường Hồng Gai"
            },
            {
                "maXa": "22525014",
                "tenXa": "Phường Liên Hoà"
            },
            {
                "maXa": "22509049",
                "tenXa": "Phường Móng Cái 1"
            },
            {
                "maXa": "22509050",
                "tenXa": "Phường Móng Cái 2"
            },
            {
                "maXa": "22509051",
                "tenXa": "Phường Móng Cái 3"
            },
            {
                "maXa": "22503026",
                "tenXa": "Phường Mông Dương"
            },
            {
                "maXa": "22521004",
                "tenXa": "Phường Mạo Khê"
            },
            {
                "maXa": "22525013",
                "tenXa": "Phường Phong Cốc"
            },
            {
                "maXa": "22503027",
                "tenXa": "Phường Quang Hanh"
            },
            {
                "maXa": "22525011",
                "tenXa": "Phường Quảng Yên"
            },
            {
                "maXa": "22501015",
                "tenXa": "Phường Tuần Châu"
            },
            {
                "maXa": "22505008",
                "tenXa": "Phường Uông Bí"
            },
            {
                "maXa": "22501016",
                "tenXa": "Phường Việt Hưng"
            },
            {
                "maXa": "22505007",
                "tenXa": "Phường Vàng Danh"
            },
            {
                "maXa": "22505006",
                "tenXa": "Phường Yên Tử"
            },
            {
                "maXa": "22525009",
                "tenXa": "Phường Đông Mai"
            },
            {
                "maXa": "22521002",
                "tenXa": "Phường Đông Triều"
            },
            {
                "maXa": "22515037",
                "tenXa": "Xã Ba Chẽ"
            },
            {
                "maXa": "22507045",
                "tenXa": "Xã Bình Liêu"
            },
            {
                "maXa": "22511054",
                "tenXa": "Xã Cái Chiên"
            },
            {
                "maXa": "22507043",
                "tenXa": "Xã Hoành Mô"
            },
            {
                "maXa": "22503030",
                "tenXa": "Xã Hải Hoà"
            },
            {
                "maXa": "22513034",
                "tenXa": "Xã Hải Lạng"
            },
            {
                "maXa": "22509047",
                "tenXa": "Xã Hải Ninh"
            },
            {
                "maXa": "22509046",
                "tenXa": "Xã Hải Sơn"
            },
            {
                "maXa": "22515036",
                "tenXa": "Xã Kỳ Thượng"
            },
            {
                "maXa": "22501035",
                "tenXa": "Xã Lương Minh"
            },
            {
                "maXa": "22507044",
                "tenXa": "Xã Lục Hồn"
            },
            {
                "maXa": "22511040",
                "tenXa": "Xã Quảng Hà"
            },
            {
                "maXa": "22501024",
                "tenXa": "Xã Quảng La"
            },
            {
                "maXa": "22527038",
                "tenXa": "Xã Quảng Tân"
            },
            {
                "maXa": "22511042",
                "tenXa": "Xã Quảng Đức"
            },
            {
                "maXa": "22501025",
                "tenXa": "Xã Thống Nhất"
            },
            {
                "maXa": "22513031",
                "tenXa": "Xã Tiên Yên"
            },
            {
                "maXa": "22509048",
                "tenXa": "Xã Vĩnh Thực"
            },
            {
                "maXa": "22513032",
                "tenXa": "Xã Điền Xá"
            },
            {
                "maXa": "22513033",
                "tenXa": "Xã Đông Ngũ"
            },
            {
                "maXa": "22511041",
                "tenXa": "Xã Đường Hoa"
            },
            {
                "maXa": "22527039",
                "tenXa": "Xã Đầm Hà"
            },
            {
                "maXa": "22523053",
                "tenXa": "Đặc khu Cô Tô"
            },
            {
                "maXa": "22517052",
                "tenXa": "Đặc khu Vân Đồn"
            }
        ]
    },
    {
        "maThanhPho": "19",
        "thanhPho": "Tỉnh Quảng Trị",
        "xaPhuong": [
            {
                "maXa": "40715006",
                "tenXa": "Phường Ba Đồn"
            },
            {
                "maXa": "40715007",
                "tenXa": "Phường Bắc Gianh"
            },
            {
                "maXa": "40901043",
                "tenXa": "Phường Nam Đông Hà"
            },
            {
                "maXa": "40903044",
                "tenXa": "Phường Quảng Trị"
            },
            {
                "maXa": "40901042",
                "tenXa": "Phường Đông Hà"
            },
            {
                "maXa": "40701001",
                "tenXa": "Phường Đồng Hới"
            },
            {
                "maXa": "40701003",
                "tenXa": "Phường Đồng Sơn"
            },
            {
                "maXa": "40701002",
                "tenXa": "Phường Đồng Thuận"
            },
            {
                "maXa": "40915060",
                "tenXa": "Xã A Dơi"
            },
            {
                "maXa": "40917064",
                "tenXa": "Xã Ba Lòng"
            },
            {
                "maXa": "40709026",
                "tenXa": "Xã Bắc Trạch"
            },
            {
                "maXa": "40907053",
                "tenXa": "Xã Bến Hải"
            },
            {
                "maXa": "40905049",
                "tenXa": "Xã Bến Quan"
            },
            {
                "maXa": "40709029",
                "tenXa": "Xã Bố Trạch"
            },
            {
                "maXa": "40713036",
                "tenXa": "Xã Cam Hồng"
            },
            {
                "maXa": "40909066",
                "tenXa": "Xã Cam Lộ"
            },
            {
                "maXa": "40907050",
                "tenXa": "Xã Cồn Tiên"
            },
            {
                "maXa": "40905046",
                "tenXa": "Xã Cửa Tùng"
            },
            {
                "maXa": "40907051",
                "tenXa": "Xã Cửa Việt"
            },
            {
                "maXa": "40913073",
                "tenXa": "Xã Diên Sanh"
            },
            {
                "maXa": "40705008",
                "tenXa": "Xã Dân Hóa"
            },
            {
                "maXa": "40907052",
                "tenXa": "Xã Gio Linh"
            },
            {
                "maXa": "40909067",
                "tenXa": "Xã Hiếu Giang"
            },
            {
                "maXa": "40707022",
                "tenXa": "Xã Hoà Trạch"
            },
            {
                "maXa": "40709028",
                "tenXa": "Xã Hoàn Lão"
            },
            {
                "maXa": "40917065",
                "tenXa": "Xã Hướng Hiệp"
            },
            {
                "maXa": "40915054",
                "tenXa": "Xã Hướng Lập"
            },
            {
                "maXa": "40915055",
                "tenXa": "Xã Hướng Phùng"
            },
            {
                "maXa": "40913075",
                "tenXa": "Xã Hải Lăng"
            },
            {
                "maXa": "40915056",
                "tenXa": "Xã Khe Sanh"
            },
            {
                "maXa": "40713041",
                "tenXa": "Xã Kim Ngân"
            },
            {
                "maXa": "40705010",
                "tenXa": "Xã Kim Phú"
            },
            {
                "maXa": "40705009",
                "tenXa": "Xã Kim Điền"
            },
            {
                "maXa": "40917061",
                "tenXa": "Xã La Lay"
            },
            {
                "maXa": "40915058",
                "tenXa": "Xã Lao Bảo"
            },
            {
                "maXa": "40915059",
                "tenXa": "Xã Lìa"
            },
            {
                "maXa": "40713040",
                "tenXa": "Xã Lệ Ninh"
            },
            {
                "maXa": "40713035",
                "tenXa": "Xã Lệ Thủy"
            },
            {
                "maXa": "40705011",
                "tenXa": "Xã Minh Hóa"
            },
            {
                "maXa": "40913074",
                "tenXa": "Xã Mỹ Thủy"
            },
            {
                "maXa": "40715005",
                "tenXa": "Xã Nam Ba Đồn"
            },
            {
                "maXa": "40911072",
                "tenXa": "Xã Nam Cửa Việt"
            },
            {
                "maXa": "40715004",
                "tenXa": "Xã Nam Gianh"
            },
            {
                "maXa": "40913077",
                "tenXa": "Xã Nam Hải Lăng"
            },
            {
                "maXa": "40709030",
                "tenXa": "Xã Nam Trạch"
            },
            {
                "maXa": "40711032",
                "tenXa": "Xã Ninh Châu"
            },
            {
                "maXa": "40709025",
                "tenXa": "Xã Phong Nha"
            },
            {
                "maXa": "40707023",
                "tenXa": "Xã Phú Trạch"
            },
            {
                "maXa": "40711031",
                "tenXa": "Xã Quảng Ninh"
            },
            {
                "maXa": "40707021",
                "tenXa": "Xã Quảng Trạch"
            },
            {
                "maXa": "40713037",
                "tenXa": "Xã Sen Ngư"
            },
            {
                "maXa": "40709024",
                "tenXa": "Xã Thượng Trạch"
            },
            {
                "maXa": "40911070",
                "tenXa": "Xã Triệu Bình"
            },
            {
                "maXa": "40911071",
                "tenXa": "Xã Triệu Cơ"
            },
            {
                "maXa": "40911068",
                "tenXa": "Xã Triệu Phong"
            },
            {
                "maXa": "40707020",
                "tenXa": "Xã Trung Thuần"
            },
            {
                "maXa": "40711033",
                "tenXa": "Xã Trường Ninh"
            },
            {
                "maXa": "40713039",
                "tenXa": "Xã Trường Phú"
            },
            {
                "maXa": "40711034",
                "tenXa": "Xã Trường Sơn"
            },
            {
                "maXa": "40703017",
                "tenXa": "Xã Tuyên Bình"
            },
            {
                "maXa": "40703018",
                "tenXa": "Xã Tuyên Hóa"
            },
            {
                "maXa": "40703013",
                "tenXa": "Xã Tuyên Lâm"
            },
            {
                "maXa": "40703016",
                "tenXa": "Xã Tuyên Phú"
            },
            {
                "maXa": "40703014",
                "tenXa": "Xã Tuyên Sơn"
            },
            {
                "maXa": "40917062",
                "tenXa": "Xã Tà Rụt"
            },
            {
                "maXa": "40707019",
                "tenXa": "Xã Tân Gianh"
            },
            {
                "maXa": "40915057",
                "tenXa": "Xã Tân Lập"
            },
            {
                "maXa": "40713038",
                "tenXa": "Xã Tân Mỹ"
            },
            {
                "maXa": "40705012",
                "tenXa": "Xã Tân Thành"
            },
            {
                "maXa": "40905047",
                "tenXa": "Xã Vĩnh Hoàng"
            },
            {
                "maXa": "40905045",
                "tenXa": "Xã Vĩnh Linh"
            },
            {
                "maXa": "40905048",
                "tenXa": "Xã Vĩnh Thủy"
            },
            {
                "maXa": "40913076",
                "tenXa": "Xã Vĩnh Định"
            },
            {
                "maXa": "40911069",
                "tenXa": "Xã Ái Tử"
            },
            {
                "maXa": "40917063",
                "tenXa": "Xã Đakrông"
            },
            {
                "maXa": "40709027",
                "tenXa": "Xã Đông Trạch"
            },
            {
                "maXa": "40703015",
                "tenXa": "Xã Đồng Lê"
            },
            {
                "maXa": "40919078",
                "tenXa": "Đặc khu Cồn Cỏ"
            }
        ]
    },
    {
        "maThanhPho": "15",
        "thanhPho": "Tỉnh Sơn La",
        "xaPhuong": [
            {
                "maXa": "30301002",
                "tenXa": "Phường Chiềng An"
            },
            {
                "maXa": "30301003",
                "tenXa": "Phường Chiềng Cơi"
            },
            {
                "maXa": "30301004",
                "tenXa": "Phường Chiềng Sinh"
            },
            {
                "maXa": "30319005",
                "tenXa": "Phường Mộc Châu"
            },
            {
                "maXa": "30319006",
                "tenXa": "Phường Mộc Sơn"
            },
            {
                "maXa": "30319008",
                "tenXa": "Phường Thảo Nguyên"
            },
            {
                "maXa": "30301001",
                "tenXa": "Phường Tô Hiệu"
            },
            {
                "maXa": "30319007",
                "tenXa": "Phường Vân Sơn"
            },
            {
                "maXa": "30307026",
                "tenXa": "Xã Bình Thuận"
            },
            {
                "maXa": "30315058",
                "tenXa": "Xã Bó Sinh"
            },
            {
                "maXa": "30309033",
                "tenXa": "Xã Bắc Yên"
            },
            {
                "maXa": "30305032",
                "tenXa": "Xã Chiềng Hoa"
            },
            {
                "maXa": "30317047",
                "tenXa": "Xã Chiềng Hặc"
            },
            {
                "maXa": "30315061",
                "tenXa": "Xã Chiềng Khoong"
            },
            {
                "maXa": "30315059",
                "tenXa": "Xã Chiềng Khương"
            },
            {
                "maXa": "30307021",
                "tenXa": "Xã Chiềng La"
            },
            {
                "maXa": "30305030",
                "tenXa": "Xã Chiềng Lao"
            },
            {
                "maXa": "30313050",
                "tenXa": "Xã Chiềng Mai"
            },
            {
                "maXa": "30313053",
                "tenXa": "Xã Chiềng Mung"
            },
            {
                "maXa": "30313057",
                "tenXa": "Xã Chiềng Sung"
            },
            {
                "maXa": "30315066",
                "tenXa": "Xã Chiềng Sơ"
            },
            {
                "maXa": "30319011",
                "tenXa": "Xã Chiềng Sơn"
            },
            {
                "maXa": "30309038",
                "tenXa": "Xã Chiềng Sại"
            },
            {
                "maXa": "30307025",
                "tenXa": "Xã Co Mạ"
            },
            {
                "maXa": "30311040",
                "tenXa": "Xã Gia Phù"
            },
            {
                "maXa": "30315065",
                "tenXa": "Xã Huổi Một"
            },
            {
                "maXa": "30311045",
                "tenXa": "Xã Kim Bon"
            },
            {
                "maXa": "30307028",
                "tenXa": "Xã Long Hẹ"
            },
            {
                "maXa": "30317048",
                "tenXa": "Xã Lóng Phiêng"
            },
            {
                "maXa": "30319010",
                "tenXa": "Xã Lóng Sập"
            },
            {
                "maXa": "30313051",
                "tenXa": "Xã Mai Sơn"
            },
            {
                "maXa": "30307023",
                "tenXa": "Xã Muổi Nọi"
            },
            {
                "maXa": "30311043",
                "tenXa": "Xã Mường Bang"
            },
            {
                "maXa": "30307070",
                "tenXa": "Xã Mường Bám"
            },
            {
                "maXa": "30305031",
                "tenXa": "Xã Mường Bú"
            },
            {
                "maXa": "30313055",
                "tenXa": "Xã Mường Chanh"
            },
            {
                "maXa": "30303017",
                "tenXa": "Xã Mường Chiên"
            },
            {
                "maXa": "30311042",
                "tenXa": "Xã Mường Cơi"
            },
            {
                "maXa": "30303018",
                "tenXa": "Xã Mường Giôn"
            },
            {
                "maXa": "30315060",
                "tenXa": "Xã Mường Hung"
            },
            {
                "maXa": "30307024",
                "tenXa": "Xã Mường Khiêng"
            },
            {
                "maXa": "30305029",
                "tenXa": "Xã Mường La"
            },
            {
                "maXa": "30321075",
                "tenXa": "Xã Mường Lèo"
            },
            {
                "maXa": "30321074",
                "tenXa": "Xã Mường Lạn"
            },
            {
                "maXa": "30315062",
                "tenXa": "Xã Mường Lầm"
            },
            {
                "maXa": "30303019",
                "tenXa": "Xã Mường Sại"
            },
            {
                "maXa": "30307027",
                "tenXa": "Xã Mường É"
            },
            {
                "maXa": "30305071",
                "tenXa": "Xã Ngọc Chiến"
            },
            {
                "maXa": "30307022",
                "tenXa": "Xã Nậm Lầu"
            },
            {
                "maXa": "30315063",
                "tenXa": "Xã Nậm Ty"
            },
            {
                "maXa": "30313054",
                "tenXa": "Xã Phiêng Cằm"
            },
            {
                "maXa": "30317073",
                "tenXa": "Xã Phiêng Khoài"
            },
            {
                "maXa": "30313052",
                "tenXa": "Xã Phiêng Pằn"
            },
            {
                "maXa": "30311039",
                "tenXa": "Xã Phù Yên"
            },
            {
                "maXa": "30321068",
                "tenXa": "Xã Púng Bánh"
            },
            {
                "maXa": "30309037",
                "tenXa": "Xã Pắc Ngà"
            },
            {
                "maXa": "30303016",
                "tenXa": "Xã Quỳnh Nhai"
            },
            {
                "maXa": "30323013",
                "tenXa": "Xã Song Khủa"
            },
            {
                "maXa": "30311072",
                "tenXa": "Xã Suối Tọ"
            },
            {
                "maXa": "30315064",
                "tenXa": "Xã Sông Mã"
            },
            {
                "maXa": "30321067",
                "tenXa": "Xã Sốp Cộp"
            },
            {
                "maXa": "30307020",
                "tenXa": "Xã Thuận Châu"
            },
            {
                "maXa": "30313056",
                "tenXa": "Xã Tà Hộc"
            },
            {
                "maXa": "30309034",
                "tenXa": "Xã Tà Xùa"
            },
            {
                "maXa": "30311044",
                "tenXa": "Xã Tân Phong"
            },
            {
                "maXa": "30319069",
                "tenXa": "Xã Tân Yên"
            },
            {
                "maXa": "30323014",
                "tenXa": "Xã Tô Múa"
            },
            {
                "maXa": "30311041",
                "tenXa": "Xã Tường Hạ"
            },
            {
                "maXa": "30309035",
                "tenXa": "Xã Tạ Khoa"
            },
            {
                "maXa": "30323012",
                "tenXa": "Xã Vân Hồ"
            },
            {
                "maXa": "30323015",
                "tenXa": "Xã Xuân Nha"
            },
            {
                "maXa": "30309036",
                "tenXa": "Xã Xím Vàng"
            },
            {
                "maXa": "30317046",
                "tenXa": "Xã Yên Châu"
            },
            {
                "maXa": "30317049",
                "tenXa": "Xã Yên Sơn"
            },
            {
                "maXa": "30319009",
                "tenXa": "Xã Đoàn Kết"
            }
        ]
    },
    {
        "maThanhPho": "16",
        "thanhPho": "Tỉnh Thanh Hóa",
        "xaPhuong": [
            {
                "maXa": "40103010",
                "tenXa": "Phường Bỉm Sơn"
            },
            {
                "maXa": "40101006",
                "tenXa": "Phường Hàm Rồng"
            },
            {
                "maXa": "40101001",
                "tenXa": "Phường Hạc Thành"
            },
            {
                "maXa": "40153017",
                "tenXa": "Phường Hải Bình"
            },
            {
                "maXa": "40153014",
                "tenXa": "Phường Hải Lĩnh"
            },
            {
                "maXa": "40105009",
                "tenXa": "Phường Nam Sầm Sơn"
            },
            {
                "maXa": "40153019",
                "tenXa": "Phường Nghi Sơn"
            },
            {
                "maXa": "40101007",
                "tenXa": "Phường Nguyệt Viên"
            },
            {
                "maXa": "40153012",
                "tenXa": "Phường Ngọc Sơn"
            },
            {
                "maXa": "40103011",
                "tenXa": "Phường Quang Trung"
            },
            {
                "maXa": "40101002",
                "tenXa": "Phường Quảng Phú"
            },
            {
                "maXa": "40105008",
                "tenXa": "Phường Sầm Sơn"
            },
            {
                "maXa": "40153018",
                "tenXa": "Phường Trúc Lâm"
            },
            {
                "maXa": "40153013",
                "tenXa": "Phường Tân Dân"
            },
            {
                "maXa": "40153015",
                "tenXa": "Phường Tĩnh Gia"
            },
            {
                "maXa": "40153016",
                "tenXa": "Phường Đào Duy Tư"
            },
            {
                "maXa": "40101003",
                "tenXa": "Phường Đông Quang"
            },
            {
                "maXa": "40101004",
                "tenXa": "Phường Đông Sơn"
            },
            {
                "maXa": "40101005",
                "tenXa": "Phường Đông Tiến"
            },
            {
                "maXa": "40147088",
                "tenXa": "Xã An Nông"
            },
            {
                "maXa": "40133037",
                "tenXa": "Xã Ba Đình"
            },
            {
                "maXa": "40129082",
                "tenXa": "Xã Biện Thượng"
            },
            {
                "maXa": "40113123",
                "tenXa": "Xã Bá Thước"
            },
            {
                "maXa": "40123158",
                "tenXa": "Xã Bát Mọt"
            },
            {
                "maXa": "40153020",
                "tenXa": "Xã Các Sơn"
            },
            {
                "maXa": "40151059",
                "tenXa": "Xã Công Chính"
            },
            {
                "maXa": "40115135",
                "tenXa": "Xã Cẩm Thạch"
            },
            {
                "maXa": "40115136",
                "tenXa": "Xã Cẩm Thủy"
            },
            {
                "maXa": "40115139",
                "tenXa": "Xã Cẩm Tân"
            },
            {
                "maXa": "40115137",
                "tenXa": "Xã Cẩm Tú"
            },
            {
                "maXa": "40115138",
                "tenXa": "Xã Cẩm Vân"
            },
            {
                "maXa": "40113124",
                "tenXa": "Xã Cổ Lũng"
            },
            {
                "maXa": "40117118",
                "tenXa": "Xã Giao An"
            },
            {
                "maXa": "40109102",
                "tenXa": "Xã Hiền Kiệt"
            },
            {
                "maXa": "40139030",
                "tenXa": "Xã Hoa Lộc"
            },
            {
                "maXa": "40131025",
                "tenXa": "Xã Hoạt Giang"
            },
            {
                "maXa": "40143042",
                "tenXa": "Xã Hoằng Châu"
            },
            {
                "maXa": "40143045",
                "tenXa": "Xã Hoằng Giang"
            },
            {
                "maXa": "40143038",
                "tenXa": "Xã Hoằng Hóa"
            },
            {
                "maXa": "40143041",
                "tenXa": "Xã Hoằng Lộc"
            },
            {
                "maXa": "40143044",
                "tenXa": "Xã Hoằng Phú"
            },
            {
                "maXa": "40143043",
                "tenXa": "Xã Hoằng Sơn"
            },
            {
                "maXa": "40143040",
                "tenXa": "Xã Hoằng Thanh"
            },
            {
                "maXa": "40143039",
                "tenXa": "Xã Hoằng Tiến"
            },
            {
                "maXa": "40131024",
                "tenXa": "Xã Hà Long"
            },
            {
                "maXa": "40131022",
                "tenXa": "Xã Hà Trung"
            },
            {
                "maXa": "40125149",
                "tenXa": "Xã Hóa Quỳ"
            },
            {
                "maXa": "40139029",
                "tenXa": "Xã Hậu Lộc"
            },
            {
                "maXa": "40133034",
                "tenXa": "Xã Hồ Vương"
            },
            {
                "maXa": "40109099",
                "tenXa": "Xã Hồi Xuân"
            },
            {
                "maXa": "40147087",
                "tenXa": "Xã Hợp Tiến"
            },
            {
                "maXa": "40119140",
                "tenXa": "Xã Kim Tân"
            },
            {
                "maXa": "40121134",
                "tenXa": "Xã Kiên Thọ"
            },
            {
                "maXa": "40137076",
                "tenXa": "Xã Lam Sơn"
            },
            {
                "maXa": "40117115",
                "tenXa": "Xã Linh Sơn"
            },
            {
                "maXa": "40123162",
                "tenXa": "Xã Luận Thành"
            },
            {
                "maXa": "40131026",
                "tenXa": "Xã Lĩnh Toại"
            },
            {
                "maXa": "40149046",
                "tenXa": "Xã Lưu Vệ"
            },
            {
                "maXa": "40123160",
                "tenXa": "Xã Lương Sơn"
            },
            {
                "maXa": "40121132",
                "tenXa": "Xã Minh Sơn"
            },
            {
                "maXa": "40107091",
                "tenXa": "Xã Mường Chanh"
            },
            {
                "maXa": "40107094",
                "tenXa": "Xã Mường Lát"
            },
            {
                "maXa": "40107097",
                "tenXa": "Xã Mường Lý"
            },
            {
                "maXa": "40111110",
                "tenXa": "Xã Mường Mìn"
            },
            {
                "maXa": "40127153",
                "tenXa": "Xã Mậu Lâm"
            },
            {
                "maXa": "40111107",
                "tenXa": "Xã Na Mèo"
            },
            {
                "maXa": "40109100",
                "tenXa": "Xã Nam Xuân"
            },
            {
                "maXa": "40133036",
                "tenXa": "Xã Nga An"
            },
            {
                "maXa": "40133032",
                "tenXa": "Xã Nga Sơn"
            },
            {
                "maXa": "40133033",
                "tenXa": "Xã Nga Thắng"
            },
            {
                "maXa": "40121133",
                "tenXa": "Xã Nguyệt Ấn"
            },
            {
                "maXa": "40121131",
                "tenXa": "Xã Ngọc Liên"
            },
            {
                "maXa": "40121129",
                "tenXa": "Xã Ngọc Lặc"
            },
            {
                "maXa": "40119142",
                "tenXa": "Xã Ngọc Trạo"
            },
            {
                "maXa": "40107096",
                "tenXa": "Xã Nhi Sơn"
            },
            {
                "maXa": "40127154",
                "tenXa": "Xã Như Thanh"
            },
            {
                "maXa": "40125146",
                "tenXa": "Xã Như Xuân"
            },
            {
                "maXa": "40151053",
                "tenXa": "Xã Nông Cống"
            },
            {
                "maXa": "40109104",
                "tenXa": "Xã Phú Lệ"
            },
            {
                "maXa": "40109103",
                "tenXa": "Xã Phú Xuân"
            },
            {
                "maXa": "40113125",
                "tenXa": "Xã Pù Luông"
            },
            {
                "maXa": "40107095",
                "tenXa": "Xã Pù Nhi"
            },
            {
                "maXa": "40111113",
                "tenXa": "Xã Quan Sơn"
            },
            {
                "maXa": "40107092",
                "tenXa": "Xã Quang Chiểu"
            },
            {
                "maXa": "40113128",
                "tenXa": "Xã Quý Lương"
            },
            {
                "maXa": "40135068",
                "tenXa": "Xã Quý Lộc"
            },
            {
                "maXa": "40149050",
                "tenXa": "Xã Quảng Bình"
            },
            {
                "maXa": "40149052",
                "tenXa": "Xã Quảng Chính"
            },
            {
                "maXa": "40149048",
                "tenXa": "Xã Quảng Ngọc"
            },
            {
                "maXa": "40149049",
                "tenXa": "Xã Quảng Ninh"
            },
            {
                "maXa": "40149047",
                "tenXa": "Xã Quảng Yên"
            },
            {
                "maXa": "40137075",
                "tenXa": "Xã Sao Vàng"
            },
            {
                "maXa": "40111108",
                "tenXa": "Xã Sơn Thủy"
            },
            {
                "maXa": "40111109",
                "tenXa": "Xã Sơn Điện"
            },
            {
                "maXa": "40107093",
                "tenXa": "Xã Tam chung"
            },
            {
                "maXa": "40111112",
                "tenXa": "Xã Tam Lư"
            },
            {
                "maXa": "40111111",
                "tenXa": "Xã Tam Thanh"
            },
            {
                "maXa": "40127157",
                "tenXa": "Xã Thanh Kỳ"
            },
            {
                "maXa": "40125151",
                "tenXa": "Xã Thanh Phong"
            },
            {
                "maXa": "40125150",
                "tenXa": "Xã Thanh Quân"
            },
            {
                "maXa": "40109101",
                "tenXa": "Xã Thiên Phủ"
            },
            {
                "maXa": "40113122",
                "tenXa": "Xã Thiết Ống"
            },
            {
                "maXa": "40141060",
                "tenXa": "Xã Thiệu Hóa"
            },
            {
                "maXa": "40141061",
                "tenXa": "Xã Thiệu Quang"
            },
            {
                "maXa": "40141062",
                "tenXa": "Xã Thiệu Tiến"
            },
            {
                "maXa": "40141063",
                "tenXa": "Xã Thiệu Toán"
            },
            {
                "maXa": "40141064",
                "tenXa": "Xã Thiệu Trung"
            },
            {
                "maXa": "40119144",
                "tenXa": "Xã Thành Vinh"
            },
            {
                "maXa": "40151057",
                "tenXa": "Xã Thăng Bình"
            },
            {
                "maXa": "40123161",
                "tenXa": "Xã Thường Xuân"
            },
            {
                "maXa": "40125147",
                "tenXa": "Xã Thượng Ninh"
            },
            {
                "maXa": "40119143",
                "tenXa": "Xã Thạch Bình"
            },
            {
                "maXa": "40121130",
                "tenXa": "Xã Thạch Lập"
            },
            {
                "maXa": "40119145",
                "tenXa": "Xã Thạch Quảng"
            },
            {
                "maXa": "40123165",
                "tenXa": "Xã Thắng Lộc"
            },
            {
                "maXa": "40151054",
                "tenXa": "Xã Thắng Lợi"
            },
            {
                "maXa": "40147084",
                "tenXa": "Xã Thọ Bình"
            },
            {
                "maXa": "40137073",
                "tenXa": "Xã Thọ Long"
            },
            {
                "maXa": "40137077",
                "tenXa": "Xã Thọ Lập"
            },
            {
                "maXa": "40147085",
                "tenXa": "Xã Thọ Ngọc"
            },
            {
                "maXa": "40147086",
                "tenXa": "Xã Thọ Phú"
            },
            {
                "maXa": "40137072",
                "tenXa": "Xã Thọ Xuân"
            },
            {
                "maXa": "40149051",
                "tenXa": "Xã Tiên Trang"
            },
            {
                "maXa": "40139027",
                "tenXa": "Xã Triệu Lộc"
            },
            {
                "maXa": "40147083",
                "tenXa": "Xã Triệu Sơn"
            },
            {
                "maXa": "40151055",
                "tenXa": "Xã Trung Chính"
            },
            {
                "maXa": "40111114",
                "tenXa": "Xã Trung Hạ"
            },
            {
                "maXa": "40107098",
                "tenXa": "Xã Trung Lý"
            },
            {
                "maXa": "40109106",
                "tenXa": "Xã Trung Sơn"
            },
            {
                "maXa": "40109105",
                "tenXa": "Xã Trung Thành"
            },
            {
                "maXa": "40153021",
                "tenXa": "Xã Trường Lâm"
            },
            {
                "maXa": "40151056",
                "tenXa": "Xã Trường Văn"
            },
            {
                "maXa": "40147089",
                "tenXa": "Xã Tân Ninh"
            },
            {
                "maXa": "40123163",
                "tenXa": "Xã Tân Thành"
            },
            {
                "maXa": "40133035",
                "tenXa": "Xã Tân Tiến"
            },
            {
                "maXa": "40129081",
                "tenXa": "Xã Tây Đô"
            },
            {
                "maXa": "40151058",
                "tenXa": "Xã Tượng Lĩnh"
            },
            {
                "maXa": "40131023",
                "tenXa": "Xã Tống Sơn"
            },
            {
                "maXa": "40119141",
                "tenXa": "Xã Vân Du"
            },
            {
                "maXa": "40113121",
                "tenXa": "Xã Văn Nho"
            },
            {
                "maXa": "40117117",
                "tenXa": "Xã Văn Phú"
            },
            {
                "maXa": "40129080",
                "tenXa": "Xã Vĩnh Lộc"
            },
            {
                "maXa": "40139031",
                "tenXa": "Xã Vạn Lộc"
            },
            {
                "maXa": "40123164",
                "tenXa": "Xã Vạn Xuân"
            },
            {
                "maXa": "40125148",
                "tenXa": "Xã Xuân Bình"
            },
            {
                "maXa": "40123166",
                "tenXa": "Xã Xuân Chinh"
            },
            {
                "maXa": "40127152",
                "tenXa": "Xã Xuân Du"
            },
            {
                "maXa": "40137074",
                "tenXa": "Xã Xuân Hoà"
            },
            {
                "maXa": "40137079",
                "tenXa": "Xã Xuân Lập"
            },
            {
                "maXa": "40127156",
                "tenXa": "Xã Xuân Thái"
            },
            {
                "maXa": "40137078",
                "tenXa": "Xã Xuân Tín"
            },
            {
                "maXa": "40117119",
                "tenXa": "Xã Yên Khương"
            },
            {
                "maXa": "40123159",
                "tenXa": "Xã Yên Nhân"
            },
            {
                "maXa": "40135069",
                "tenXa": "Xã Yên Ninh"
            },
            {
                "maXa": "40135067",
                "tenXa": "Xã Yên Phú"
            },
            {
                "maXa": "40117120",
                "tenXa": "Xã Yên Thắng"
            },
            {
                "maXa": "40127155",
                "tenXa": "Xã Yên Thọ"
            },
            {
                "maXa": "40135066",
                "tenXa": "Xã Yên Trường"
            },
            {
                "maXa": "40135065",
                "tenXa": "Xã Yên Định"
            },
            {
                "maXa": "40113126",
                "tenXa": "Xã Điền Lư"
            },
            {
                "maXa": "40113127",
                "tenXa": "Xã Điền Quang"
            },
            {
                "maXa": "40139028",
                "tenXa": "Xã Đông Thành"
            },
            {
                "maXa": "40135071",
                "tenXa": "Xã Định Hoà"
            },
            {
                "maXa": "40135070",
                "tenXa": "Xã Định Tân"
            },
            {
                "maXa": "40117116",
                "tenXa": "Xã Đồng Lương"
            },
            {
                "maXa": "40147090",
                "tenXa": "Xã Đồng Tiến"
            }
        ]
    },
    {
        "maThanhPho": "10",
        "thanhPho": "Tỉnh Thái Nguyên",
        "xaPhuong": [
            {
                "maXa": "21503035",
                "tenXa": "Phường Bá Xuyên"
            },
            {
                "maXa": "21503036",
                "tenXa": "Phường Bách Quang"
            },
            {
                "maXa": "20701080",
                "tenXa": "Phường Bắc Kạn"
            },
            {
                "maXa": "21501004",
                "tenXa": "Phường Gia Sàng"
            },
            {
                "maXa": "21501002",
                "tenXa": "Phường Linh Sơn"
            },
            {
                "maXa": "21501001",
                "tenXa": "Phường Phan Đình Phùng"
            },
            {
                "maXa": "21517021",
                "tenXa": "Phường Phúc Thuận"
            },
            {
                "maXa": "21517018",
                "tenXa": "Phường Phổ Yên"
            },
            {
                "maXa": "21501006",
                "tenXa": "Phường Quan Triều"
            },
            {
                "maXa": "21501005",
                "tenXa": "Phường Quyết Thắng"
            },
            {
                "maXa": "21503034",
                "tenXa": "Phường Sông Công"
            },
            {
                "maXa": "21517020",
                "tenXa": "Phường Trung Thành"
            },
            {
                "maXa": "21501003",
                "tenXa": "Phường Tích Lương"
            },
            {
                "maXa": "21517019",
                "tenXa": "Phường Vạn Xuân"
            },
            {
                "maXa": "20701079",
                "tenXa": "Phường Đức Xuân"
            },
            {
                "maXa": "21513014",
                "tenXa": "Xã An Khánh"
            },
            {
                "maXa": "20703058",
                "tenXa": "Xã Ba Bể"
            },
            {
                "maXa": "21505046",
                "tenXa": "Xã Bình Thành"
            },
            {
                "maXa": "21505042",
                "tenXa": "Xã Bình Yên"
            },
            {
                "maXa": "20711077",
                "tenXa": "Xã Bạch Thông"
            },
            {
                "maXa": "20704055",
                "tenXa": "Xã Bằng Thành"
            },
            {
                "maXa": "20705064",
                "tenXa": "Xã Bằng Vân"
            },
            {
                "maXa": "20704057",
                "tenXa": "Xã Cao Minh"
            },
            {
                "maXa": "20713090",
                "tenXa": "Xã Chợ Mới"
            },
            {
                "maXa": "20703059",
                "tenXa": "Xã Chợ Rã"
            },
            {
                "maXa": "20707071",
                "tenXa": "Xã Chợ Đồn"
            },
            {
                "maXa": "20709085",
                "tenXa": "Xã Côn Minh"
            },
            {
                "maXa": "20709082",
                "tenXa": "Xã Cường Lợi"
            },
            {
                "maXa": "20711075",
                "tenXa": "Xã Cẩm Giàng"
            },
            {
                "maXa": "21507050",
                "tenXa": "Xã Dân Tiến"
            },
            {
                "maXa": "20705067",
                "tenXa": "Xã Hiệp Lực"
            },
            {
                "maXa": "21509040",
                "tenXa": "Xã Hợp Thành"
            },
            {
                "maXa": "21515026",
                "tenXa": "Xã Kha Sơn"
            },
            {
                "maXa": "21505047",
                "tenXa": "Xã Kim Phượng"
            },
            {
                "maXa": "21513012",
                "tenXa": "Xã La Bằng"
            },
            {
                "maXa": "21507053",
                "tenXa": "Xã La Hiên"
            },
            {
                "maXa": "21505048",
                "tenXa": "Xã Lam Vỹ"
            },
            {
                "maXa": "20709083",
                "tenXa": "Xã Na Rì"
            },
            {
                "maXa": "20707068",
                "tenXa": "Xã Nam Cường"
            },
            {
                "maXa": "21511031",
                "tenXa": "Xã Nam Hoà"
            },
            {
                "maXa": "21507051",
                "tenXa": "Xã Nghinh Tường"
            },
            {
                "maXa": "20704056",
                "tenXa": "Xã Nghiên Loan"
            },
            {
                "maXa": "20707073",
                "tenXa": "Xã Nghĩa Tá"
            },
            {
                "maXa": "20705065",
                "tenXa": "Xã Ngân Sơn"
            },
            {
                "maXa": "20705066",
                "tenXa": "Xã Nà Phặc"
            },
            {
                "maXa": "20701078",
                "tenXa": "Xã Phong Quang"
            },
            {
                "maXa": "21515023",
                "tenXa": "Xã Phú Bình"
            },
            {
                "maXa": "21509037",
                "tenXa": "Xã Phú Lương"
            },
            {
                "maXa": "21513013",
                "tenXa": "Xã Phú Lạc"
            },
            {
                "maXa": "21513011",
                "tenXa": "Xã Phú Thịnh"
            },
            {
                "maXa": "21513017",
                "tenXa": "Xã Phú Xuyên"
            },
            {
                "maXa": "21505045",
                "tenXa": "Xã Phú Đình"
            },
            {
                "maXa": "20703060",
                "tenXa": "Xã Phúc Lộc"
            },
            {
                "maXa": "21505044",
                "tenXa": "Xã Phượng Tiến"
            },
            {
                "maXa": "20711074",
                "tenXa": "Xã Phủ Thông"
            },
            {
                "maXa": "21511029",
                "tenXa": "Xã Quang Sơn"
            },
            {
                "maXa": "21513015",
                "tenXa": "Xã Quân Chu"
            },
            {
                "maXa": "20707069",
                "tenXa": "Xã Quảng Bạch"
            },
            {
                "maXa": "21507091",
                "tenXa": "Xã Sảng Mộc"
            },
            {
                "maXa": "20713088",
                "tenXa": "Xã Thanh Mai"
            },
            {
                "maXa": "20713089",
                "tenXa": "Xã Thanh Thịnh"
            },
            {
                "maXa": "21517022",
                "tenXa": "Xã Thành Công"
            },
            {
                "maXa": "20703061",
                "tenXa": "Xã Thượng Minh"
            },
            {
                "maXa": "20705092",
                "tenXa": "Xã Thượng Quan"
            },
            {
                "maXa": "21507052",
                "tenXa": "Xã Thần Sa"
            },
            {
                "maXa": "21505043",
                "tenXa": "Xã Trung Hội"
            },
            {
                "maXa": "21507054",
                "tenXa": "Xã Tràng Xá"
            },
            {
                "maXa": "21511030",
                "tenXa": "Xã Trại Cau"
            },
            {
                "maXa": "20709084",
                "tenXa": "Xã Trần Phú"
            },
            {
                "maXa": "21501007",
                "tenXa": "Xã Tân Cương"
            },
            {
                "maXa": "21515027",
                "tenXa": "Xã Tân Khánh"
            },
            {
                "maXa": "20713087",
                "tenXa": "Xã Tân Kỳ"
            },
            {
                "maXa": "21515024",
                "tenXa": "Xã Tân Thành"
            },
            {
                "maXa": "21509038",
                "tenXa": "Xã Vô Tranh"
            },
            {
                "maXa": "21507049",
                "tenXa": "Xã Võ Nhai"
            },
            {
                "maXa": "21511032",
                "tenXa": "Xã Văn Hán"
            },
            {
                "maXa": "20709081",
                "tenXa": "Xã Văn Lang"
            },
            {
                "maXa": "21511033",
                "tenXa": "Xã Văn Lăng"
            },
            {
                "maXa": "20711076",
                "tenXa": "Xã Vĩnh Thông"
            },
            {
                "maXa": "21513016",
                "tenXa": "Xã Vạn Phú"
            },
            {
                "maXa": "20709086",
                "tenXa": "Xã Xuân Dương"
            },
            {
                "maXa": "20713063",
                "tenXa": "Xã Yên Bình"
            },
            {
                "maXa": "20707072",
                "tenXa": "Xã Yên Phong"
            },
            {
                "maXa": "20707070",
                "tenXa": "Xã Yên Thịnh"
            },
            {
                "maXa": "21509039",
                "tenXa": "Xã Yên Trạch"
            },
            {
                "maXa": "21515025",
                "tenXa": "Xã Điềm Thụy"
            },
            {
                "maXa": "21501008",
                "tenXa": "Xã Đại Phúc"
            },
            {
                "maXa": "21513009",
                "tenXa": "Xã Đại Từ"
            },
            {
                "maXa": "21505041",
                "tenXa": "Xã Định Hóa"
            },
            {
                "maXa": "21511028",
                "tenXa": "Xã Đồng Hỷ"
            },
            {
                "maXa": "20703062",
                "tenXa": "Xã Đồng Phúc"
            },
            {
                "maXa": "21513010",
                "tenXa": "Xã Đức Lương"
            }
        ]
    },
    {
        "maThanhPho": "08",
        "thanhPho": "Tỉnh Tuyên Quang",
        "xaPhuong": [
            {
                "maXa": "21101050",
                "tenXa": "Phường An Tường"
            },
            {
                "maXa": "21101051",
                "tenXa": "Phường Bình Thuận"
            },
            {
                "maXa": "20101082",
                "tenXa": "Phường Hà Giang 1"
            },
            {
                "maXa": "20101083",
                "tenXa": "Phường Hà Giang 2"
            },
            {
                "maXa": "21101048",
                "tenXa": "Phường Minh Xuân"
            },
            {
                "maXa": "21101047",
                "tenXa": "Phường Mỹ Lâm"
            },
            {
                "maXa": "21101049",
                "tenXa": "Phường Nông Tiến"
            },
            {
                "maXa": "21113004",
                "tenXa": "Xã Bình An"
            },
            {
                "maXa": "21111040",
                "tenXa": "Xã Bình Ca"
            },
            {
                "maXa": "21107024",
                "tenXa": "Xã Bình Xa"
            },
            {
                "maXa": "20115091",
                "tenXa": "Xã Bạch Ngọc"
            },
            {
                "maXa": "21107021",
                "tenXa": "Xã Bạch Xa"
            },
            {
                "maXa": "20107064",
                "tenXa": "Xã Bạch Đích"
            },
            {
                "maXa": "20113117",
                "tenXa": "Xã Bản Máy"
            },
            {
                "maXa": "20111077",
                "tenXa": "Xã Bắc Mê"
            },
            {
                "maXa": "20119100",
                "tenXa": "Xã Bắc Quang"
            },
            {
                "maXa": "20119099",
                "tenXa": "Xã Bằng Hành"
            },
            {
                "maXa": "20118106",
                "tenXa": "Xã Bằng Lang"
            },
            {
                "maXa": "20115094",
                "tenXa": "Xã Cao Bồ"
            },
            {
                "maXa": "21105013",
                "tenXa": "Xã Chiêm Hoá"
            },
            {
                "maXa": "20109071",
                "tenXa": "Xã Cán Tỷ"
            },
            {
                "maXa": "21103005",
                "tenXa": "Xã Côn Lôn"
            },
            {
                "maXa": "20107068",
                "tenXa": "Xã Du Già"
            },
            {
                "maXa": "20111078",
                "tenXa": "Xã Giáp Trung"
            },
            {
                "maXa": "21105014",
                "tenXa": "Xã Hoà An"
            },
            {
                "maXa": "20113115",
                "tenXa": "Xã Hoàng Su Phì"
            },
            {
                "maXa": "21107023",
                "tenXa": "Xã Hàm Yên"
            },
            {
                "maXa": "20119101",
                "tenXa": "Xã Hùng An"
            },
            {
                "maXa": "21109028",
                "tenXa": "Xã Hùng Lợi"
            },
            {
                "maXa": "21107027",
                "tenXa": "Xã Hùng Đức"
            },
            {
                "maXa": "20113112",
                "tenXa": "Xã Hồ Thầu"
            },
            {
                "maXa": "21111045",
                "tenXa": "Xã Hồng Sơn"
            },
            {
                "maXa": "21103008",
                "tenXa": "Xã Hồng Thái"
            },
            {
                "maXa": "20117124",
                "tenXa": "Xã Khuôn Lùng"
            },
            {
                "maXa": "20105060",
                "tenXa": "Xã Khâu Vai"
            },
            {
                "maXa": "21105017",
                "tenXa": "Xã Kim Bình"
            },
            {
                "maXa": "21105015",
                "tenXa": "Xã Kiên Đài"
            },
            {
                "maXa": "21109036",
                "tenXa": "Xã Kiến Thiết"
            },
            {
                "maXa": "20115084",
                "tenXa": "Xã Lao Chải"
            },
            {
                "maXa": "20115090",
                "tenXa": "Xã Linh Hồ"
            },
            {
                "maXa": "20119098",
                "tenXa": "Xã Liên Hiệp"
            },
            {
                "maXa": "21113002",
                "tenXa": "Xã Lâm Bình"
            },
            {
                "maXa": "20109070",
                "tenXa": "Xã Lùng Tám"
            },
            {
                "maXa": "20103052",
                "tenXa": "Xã Lũng Cú"
            },
            {
                "maXa": "20103056",
                "tenXa": "Xã Lũng Phìn"
            },
            {
                "maXa": "21109033",
                "tenXa": "Xã Lực Hành"
            },
            {
                "maXa": "20111080",
                "tenXa": "Xã Minh Ngọc"
            },
            {
                "maXa": "21113003",
                "tenXa": "Xã Minh Quang"
            },
            {
                "maXa": "20111079",
                "tenXa": "Xã Minh Sơn"
            },
            {
                "maXa": "21111038",
                "tenXa": "Xã Minh Thanh"
            },
            {
                "maXa": "20115086",
                "tenXa": "Xã Minh Tân"
            },
            {
                "maXa": "20105059",
                "tenXa": "Xã Mèo Vạc"
            },
            {
                "maXa": "20107066",
                "tenXa": "Xã Mậu Duệ"
            },
            {
                "maXa": "20109072",
                "tenXa": "Xã Nghĩa Thuận"
            },
            {
                "maXa": "20107067",
                "tenXa": "Xã Ngọc Long"
            },
            {
                "maXa": "20101081",
                "tenXa": "Xã Ngọc Đường"
            },
            {
                "maXa": "21109035",
                "tenXa": "Xã Nhữ Khê"
            },
            {
                "maXa": "20105061",
                "tenXa": "Xã Niêm Sơn"
            },
            {
                "maXa": "21103009",
                "tenXa": "Xã Nà Hang"
            },
            {
                "maXa": "20117121",
                "tenXa": "Xã Nấm Dẩn"
            },
            {
                "maXa": "20113113",
                "tenXa": "Xã Nậm Dịch"
            },
            {
                "maXa": "21107022",
                "tenXa": "Xã Phù Lưu"
            },
            {
                "maXa": "20115089",
                "tenXa": "Xã Phú Linh"
            },
            {
                "maXa": "21111043",
                "tenXa": "Xã Phú Lương"
            },
            {
                "maXa": "20103055",
                "tenXa": "Xã Phố Bảng"
            },
            {
                "maXa": "20117120",
                "tenXa": "Xã Pà Vầy Sủ"
            },
            {
                "maXa": "20113118",
                "tenXa": "Xã Pờ Ly Ngài"
            },
            {
                "maXa": "20118108",
                "tenXa": "Xã Quang Bình"
            },
            {
                "maXa": "20109073",
                "tenXa": "Xã Quản Bạ"
            },
            {
                "maXa": "20117123",
                "tenXa": "Xã Quảng Nguyên"
            },
            {
                "maXa": "20103054",
                "tenXa": "Xã Sà Phìn"
            },
            {
                "maXa": "21111039",
                "tenXa": "Xã Sơn Dương"
            },
            {
                "maXa": "21111042",
                "tenXa": "Xã Sơn Thuỷ"
            },
            {
                "maXa": "20105058",
                "tenXa": "Xã Sơn Vĩ"
            },
            {
                "maXa": "20105057",
                "tenXa": "Xã Sủng Máng"
            },
            {
                "maXa": "20115085",
                "tenXa": "Xã Thanh Thuỷ"
            },
            {
                "maXa": "20115087",
                "tenXa": "Xã Thuận Hoà"
            },
            {
                "maXa": "20113116",
                "tenXa": "Xã Thàng Tín"
            },
            {
                "maXa": "21109030",
                "tenXa": "Xã Thái Bình"
            },
            {
                "maXa": "21107026",
                "tenXa": "Xã Thái Hoà"
            },
            {
                "maXa": "21107025",
                "tenXa": "Xã Thái Sơn"
            },
            {
                "maXa": "20113111",
                "tenXa": "Xã Thông Nguyên"
            },
            {
                "maXa": "21113001",
                "tenXa": "Xã Thượng Lâm"
            },
            {
                "maXa": "21103007",
                "tenXa": "Xã Thượng Nông"
            },
            {
                "maXa": "20115095",
                "tenXa": "Xã Thượng Sơn"
            },
            {
                "maXa": "20107063",
                "tenXa": "Xã Thắng Mố"
            },
            {
                "maXa": "20118110",
                "tenXa": "Xã Tiên Nguyên"
            },
            {
                "maXa": "20118104",
                "tenXa": "Xã Tiên Yên"
            },
            {
                "maXa": "21105016",
                "tenXa": "Xã Tri Phú"
            },
            {
                "maXa": "21105019",
                "tenXa": "Xã Trung Hà"
            },
            {
                "maXa": "21109029",
                "tenXa": "Xã Trung Sơn"
            },
            {
                "maXa": "20117122",
                "tenXa": "Xã Trung Thịnh"
            },
            {
                "maXa": "21111044",
                "tenXa": "Xã Trường Sinh"
            },
            {
                "maXa": "20105062",
                "tenXa": "Xã Tát Ngà"
            },
            {
                "maXa": "21105012",
                "tenXa": "Xã Tân An"
            },
            {
                "maXa": "21109031",
                "tenXa": "Xã Tân Long"
            },
            {
                "maXa": "21105010",
                "tenXa": "Xã Tân Mỹ"
            },
            {
                "maXa": "20119096",
                "tenXa": "Xã Tân Quang"
            },
            {
                "maXa": "21111041",
                "tenXa": "Xã Tân Thanh"
            },
            {
                "maXa": "20113114",
                "tenXa": "Xã Tân Tiến"
            },
            {
                "maXa": "21111037",
                "tenXa": "Xã Tân Trào"
            },
            {
                "maXa": "20118109",
                "tenXa": "Xã Tân Trịnh"
            },
            {
                "maXa": "20115088",
                "tenXa": "Xã Tùng Bá"
            },
            {
                "maXa": "20109074",
                "tenXa": "Xã Tùng Vài"
            },
            {
                "maXa": "20115093",
                "tenXa": "Xã Việt Lâm"
            },
            {
                "maXa": "20119102",
                "tenXa": "Xã Vĩnh Tuy"
            },
            {
                "maXa": "20115092",
                "tenXa": "Xã Vị Xuyên"
            },
            {
                "maXa": "20118105",
                "tenXa": "Xã Xuân Giang"
            },
            {
                "maXa": "21109032",
                "tenXa": "Xã Xuân Vân"
            },
            {
                "maXa": "20117119",
                "tenXa": "Xã Xín Mần"
            },
            {
                "maXa": "20111075",
                "tenXa": "Xã Yên Cường"
            },
            {
                "maXa": "21103006",
                "tenXa": "Xã Yên Hoa"
            },
            {
                "maXa": "21105011",
                "tenXa": "Xã Yên Lập"
            },
            {
                "maXa": "20107065",
                "tenXa": "Xã Yên Minh"
            },
            {
                "maXa": "21105018",
                "tenXa": "Xã Yên Nguyên"
            },
            {
                "maXa": "21107020",
                "tenXa": "Xã Yên Phú"
            },
            {
                "maXa": "21109034",
                "tenXa": "Xã Yên Sơn"
            },
            {
                "maXa": "20118107",
                "tenXa": "Xã Yên Thành"
            },
            {
                "maXa": "21111046",
                "tenXa": "Xã Đông Thọ"
            },
            {
                "maXa": "20111076",
                "tenXa": "Xã Đường Hồng"
            },
            {
                "maXa": "20107069",
                "tenXa": "Xã Đường Thượng"
            },
            {
                "maXa": "20119097",
                "tenXa": "Xã Đồng Tâm"
            },
            {
                "maXa": "20103053",
                "tenXa": "Xã Đồng Văn"
            },
            {
                "maXa": "20119103",
                "tenXa": "Xã Đồng Yên"
            }
        ]
    },
    {
        "maThanhPho": "27",
        "thanhPho": "Tỉnh Tây Ninh",
        "xaPhuong": [
            {
                "maXa": "70917068",
                "tenXa": "Phường An Tịnh"
            },
            {
                "maXa": "70901062",
                "tenXa": "Phường Bình Minh"
            },
            {
                "maXa": "70915070",
                "tenXa": "Phường Gia Lộc"
            },
            {
                "maXa": "70915069",
                "tenXa": "Phường Gò Dầu"
            },
            {
                "maXa": "70911065",
                "tenXa": "Phường Hoà Thành"
            },
            {
                "maXa": "80101060",
                "tenXa": "Phường Khánh Hậu"
            },
            {
                "maXa": "80129010",
                "tenXa": "Phường Kiến Tường"
            },
            {
                "maXa": "80101058",
                "tenXa": "Phường Long An"
            },
            {
                "maXa": "70911064",
                "tenXa": "Phường Long Hoa"
            },
            {
                "maXa": "70907063",
                "tenXa": "Phường Ninh Thạnh"
            },
            {
                "maXa": "70911066",
                "tenXa": "Phường Thanh Điền"
            },
            {
                "maXa": "70917067",
                "tenXa": "Phường Trảng Bàng"
            },
            {
                "maXa": "80101059",
                "tenXa": "Phường Tân An"
            },
            {
                "maXa": "70901061",
                "tenXa": "Phường Tân Ninh"
            },
            {
                "maXa": "80121055",
                "tenXa": "Xã An Lục Long"
            },
            {
                "maXa": "80115028",
                "tenXa": "Xã An Ninh"
            },
            {
                "maXa": "80129009",
                "tenXa": "Xã Bình Hiệp"
            },
            {
                "maXa": "80107011",
                "tenXa": "Xã Bình Hoà"
            },
            {
                "maXa": "80111017",
                "tenXa": "Xã Bình Thành"
            },
            {
                "maXa": "80117036",
                "tenXa": "Xã Bình Đức"
            },
            {
                "maXa": "70913096",
                "tenXa": "Xã Bến Cầu"
            },
            {
                "maXa": "80117038",
                "tenXa": "Xã Bến Lức"
            },
            {
                "maXa": "70909092",
                "tenXa": "Xã Châu Thành"
            },
            {
                "maXa": "80127048",
                "tenXa": "Xã Cần Giuộc"
            },
            {
                "maXa": "80125044",
                "tenXa": "Xã Cần Đước"
            },
            {
                "maXa": "70907077",
                "tenXa": "Xã Cầu Khởi"
            },
            {
                "maXa": "70907078",
                "tenXa": "Xã Dương Minh Châu"
            },
            {
                "maXa": "80115029",
                "tenXa": "Xã Hiệp Hoà"
            },
            {
                "maXa": "70909090",
                "tenXa": "Xã Hoà Hội"
            },
            {
                "maXa": "80115031",
                "tenXa": "Xã Hoà Khánh"
            },
            {
                "maXa": "70917071",
                "tenXa": "Xã Hưng Thuận"
            },
            {
                "maXa": "80103001",
                "tenXa": "Xã Hưng Điền"
            },
            {
                "maXa": "70909093",
                "tenXa": "Xã Hảo Đước"
            },
            {
                "maXa": "80115030",
                "tenXa": "Xã Hậu Nghĩa"
            },
            {
                "maXa": "80109013",
                "tenXa": "Xã Hậu Thạnh"
            },
            {
                "maXa": "80105007",
                "tenXa": "Xã Khánh Hưng"
            },
            {
                "maXa": "80125040",
                "tenXa": "Xã Long Cang"
            },
            {
                "maXa": "70913094",
                "tenXa": "Xã Long Chữ"
            },
            {
                "maXa": "80125045",
                "tenXa": "Xã Long Hựu"
            },
            {
                "maXa": "70913095",
                "tenXa": "Xã Long Thuận"
            },
            {
                "maXa": "80117037",
                "tenXa": "Xã Lương Hoà"
            },
            {
                "maXa": "70907076",
                "tenXa": "Xã Lộc Ninh"
            },
            {
                "maXa": "80107012",
                "tenXa": "Xã Mộc Hoá"
            },
            {
                "maXa": "80119022",
                "tenXa": "Xã Mỹ An"
            },
            {
                "maXa": "80115033",
                "tenXa": "Xã Mỹ Hạnh"
            },
            {
                "maXa": "80125042",
                "tenXa": "Xã Mỹ Lệ"
            },
            {
                "maXa": "80127047",
                "tenXa": "Xã Mỹ Lộc"
            },
            {
                "maXa": "80113025",
                "tenXa": "Xã Mỹ Quý"
            },
            {
                "maXa": "80119023",
                "tenXa": "Xã Mỹ Thạnh"
            },
            {
                "maXa": "80117039",
                "tenXa": "Xã Mỹ Yên"
            },
            {
                "maXa": "80109014",
                "tenXa": "Xã Nhơn Hoà Lập"
            },
            {
                "maXa": "80109015",
                "tenXa": "Xã Nhơn Ninh"
            },
            {
                "maXa": "80123053",
                "tenXa": "Xã Nhựt Tảo"
            },
            {
                "maXa": "70909091",
                "tenXa": "Xã Ninh Điền"
            },
            {
                "maXa": "70917072",
                "tenXa": "Xã Phước Chỉ"
            },
            {
                "maXa": "80127046",
                "tenXa": "Xã Phước Lý"
            },
            {
                "maXa": "70915074",
                "tenXa": "Xã Phước Thạnh"
            },
            {
                "maXa": "70909089",
                "tenXa": "Xã Phước Vinh"
            },
            {
                "maXa": "80127049",
                "tenXa": "Xã Phước Vĩnh Tây"
            },
            {
                "maXa": "80125041",
                "tenXa": "Xã Rạch Kiến"
            },
            {
                "maXa": "80121054",
                "tenXa": "Xã Thuận Mỹ"
            },
            {
                "maXa": "70903087",
                "tenXa": "Xã Thạnh Bình"
            },
            {
                "maXa": "80111019",
                "tenXa": "Xã Thạnh Hóa"
            },
            {
                "maXa": "80117035",
                "tenXa": "Xã Thạnh Lợi"
            },
            {
                "maXa": "80111018",
                "tenXa": "Xã Thạnh Phước"
            },
            {
                "maXa": "70915073",
                "tenXa": "Xã Thạnh Đức"
            },
            {
                "maXa": "80119021",
                "tenXa": "Xã Thủ Thừa"
            },
            {
                "maXa": "70915075",
                "tenXa": "Xã Truông Mít"
            },
            {
                "maXa": "70903088",
                "tenXa": "Xã Trà Vong"
            },
            {
                "maXa": "80105005",
                "tenXa": "Xã Tuyên Bình"
            },
            {
                "maXa": "80129008",
                "tenXa": "Xã Tuyên Thạnh"
            },
            {
                "maXa": "70903086",
                "tenXa": "Xã Tân Biên"
            },
            {
                "maXa": "70905080",
                "tenXa": "Xã Tân Châu"
            },
            {
                "maXa": "70905084",
                "tenXa": "Xã Tân Hoà"
            },
            {
                "maXa": "80103003",
                "tenXa": "Xã Tân Hưng"
            },
            {
                "maXa": "70905082",
                "tenXa": "Xã Tân Hội"
            },
            {
                "maXa": "80119024",
                "tenXa": "Xã Tân Long"
            },
            {
                "maXa": "80125043",
                "tenXa": "Xã Tân Lân"
            },
            {
                "maXa": "70903085",
                "tenXa": "Xã Tân Lập"
            },
            {
                "maXa": "70905081",
                "tenXa": "Xã Tân Phú"
            },
            {
                "maXa": "70905083",
                "tenXa": "Xã Tân Thành"
            },
            {
                "maXa": "80109016",
                "tenXa": "Xã Tân Thạnh"
            },
            {
                "maXa": "80123052",
                "tenXa": "Xã Tân Trụ"
            },
            {
                "maXa": "80111020",
                "tenXa": "Xã Tân Tây"
            },
            {
                "maXa": "80127050",
                "tenXa": "Xã Tân Tập"
            },
            {
                "maXa": "70905079",
                "tenXa": "Xã Tân Đông"
            },
            {
                "maXa": "80121056",
                "tenXa": "Xã Tầm Vu"
            },
            {
                "maXa": "80123051",
                "tenXa": "Xã Vàm Cỏ"
            },
            {
                "maXa": "80103004",
                "tenXa": "Xã Vĩnh Châu"
            },
            {
                "maXa": "80121057",
                "tenXa": "Xã Vĩnh Công"
            },
            {
                "maXa": "80105006",
                "tenXa": "Xã Vĩnh Hưng"
            },
            {
                "maXa": "80103002",
                "tenXa": "Xã Vĩnh Thạnh"
            },
            {
                "maXa": "80113026",
                "tenXa": "Xã Đông Thành"
            },
            {
                "maXa": "80115034",
                "tenXa": "Xã Đức Hoà"
            },
            {
                "maXa": "80113027",
                "tenXa": "Xã Đức Huệ"
            },
            {
                "maXa": "80115032",
                "tenXa": "Xã Đức Lập"
            }
        ]
    },
    {
        "maThanhPho": "30",
        "thanhPho": "Tỉnh Vĩnh Long",
        "xaPhuong": [
            {
                "maXa": "81101077",
                "tenXa": "Phường An Hội"
            },
            {
                "maXa": "80907033",
                "tenXa": "Phường Bình Minh"
            },
            {
                "maXa": "81101079",
                "tenXa": "Phường Bến Tre"
            },
            {
                "maXa": "80907034",
                "tenXa": "Phường Cái Vồn"
            },
            {
                "maXa": "81716069",
                "tenXa": "Phường Duyên Hải"
            },
            {
                "maXa": "81701039",
                "tenXa": "Phường Hòa Thuận"
            },
            {
                "maXa": "80901009",
                "tenXa": "Phường Long Châu"
            },
            {
                "maXa": "81701036",
                "tenXa": "Phường Long Đức"
            },
            {
                "maXa": "81701038",
                "tenXa": "Phường Nguyệt Hóa"
            },
            {
                "maXa": "81101078",
                "tenXa": "Phường Phú Khương"
            },
            {
                "maXa": "81103081",
                "tenXa": "Phường Phú Tân"
            },
            {
                "maXa": "80901010",
                "tenXa": "Phường Phước Hậu"
            },
            {
                "maXa": "81101080",
                "tenXa": "Phường Sơn Đông"
            },
            {
                "maXa": "80901008",
                "tenXa": "Phường Thanh Đức"
            },
            {
                "maXa": "81701037",
                "tenXa": "Phường Trà Vinh"
            },
            {
                "maXa": "81716070",
                "tenXa": "Phường Trường Long Hòa"
            },
            {
                "maXa": "80901011",
                "tenXa": "Phường Tân Hạnh"
            },
            {
                "maXa": "80901012",
                "tenXa": "Phường Tân Ngãi"
            },
            {
                "maXa": "80907035",
                "tenXa": "Phường Đông Thành"
            },
            {
                "maXa": "80903005",
                "tenXa": "Xã An Bình"
            },
            {
                "maXa": "81113110",
                "tenXa": "Xã An Hiệp"
            },
            {
                "maXa": "81113109",
                "tenXa": "Xã An Ngãi Trung"
            },
            {
                "maXa": "81707052",
                "tenXa": "Xã An Phú Tân"
            },
            {
                "maXa": "81115101",
                "tenXa": "Xã An Qui"
            },
            {
                "maXa": "81703040",
                "tenXa": "Xã An Trường"
            },
            {
                "maXa": "81107096",
                "tenXa": "Xã An Định"
            },
            {
                "maXa": "81113106",
                "tenXa": "Xã Ba Tri"
            },
            {
                "maXa": "81703044",
                "tenXa": "Xã Bình Phú"
            },
            {
                "maXa": "80905004",
                "tenXa": "Xã Bình Phước"
            },
            {
                "maXa": "81111120",
                "tenXa": "Xã Bình Đại"
            },
            {
                "maXa": "81113105",
                "tenXa": "Xã Bảo Thạnh"
            },
            {
                "maXa": "81109116",
                "tenXa": "Xã Châu Hòa"
            },
            {
                "maXa": "81111123",
                "tenXa": "Xã Châu Hưng"
            },
            {
                "maXa": "81705046",
                "tenXa": "Xã Châu Thành"
            },
            {
                "maXa": "81105087",
                "tenXa": "Xã Chợ Lách"
            },
            {
                "maXa": "81703042",
                "tenXa": "Xã Càng Long"
            },
            {
                "maXa": "80909029",
                "tenXa": "Xã Cái Ngang"
            },
            {
                "maXa": "80905001",
                "tenXa": "Xã Cái Nhum"
            },
            {
                "maXa": "81707050",
                "tenXa": "Xã Cầu Kè"
            },
            {
                "maXa": "81711060",
                "tenXa": "Xã Cầu Ngang"
            },
            {
                "maXa": "81103083",
                "tenXa": "Xã Giao Long"
            },
            {
                "maXa": "81109112",
                "tenXa": "Xã Giồng Trôm"
            },
            {
                "maXa": "80913018",
                "tenXa": "Xã Hiếu Phụng"
            },
            {
                "maXa": "80913019",
                "tenXa": "Xã Hiếu Thành"
            },
            {
                "maXa": "81711062",
                "tenXa": "Xã Hiệp Mỹ"
            },
            {
                "maXa": "81713065",
                "tenXa": "Xã Hàm Giang"
            },
            {
                "maXa": "80911024",
                "tenXa": "Xã Hòa Bình"
            },
            {
                "maXa": "80909025",
                "tenXa": "Xã Hòa Hiệp"
            },
            {
                "maXa": "81705048",
                "tenXa": "Xã Hòa Minh"
            },
            {
                "maXa": "81709055",
                "tenXa": "Xã Hùng Hòa"
            },
            {
                "maXa": "81105089",
                "tenXa": "Xã Hưng Khánh Trung"
            },
            {
                "maXa": "81705047",
                "tenXa": "Xã Hưng Mỹ"
            },
            {
                "maXa": "81109111",
                "tenXa": "Xã Hưng Nhượng"
            },
            {
                "maXa": "81107097",
                "tenXa": "Xã Hương Mỹ"
            },
            {
                "maXa": "81713067",
                "tenXa": "Xã Long Hiệp"
            },
            {
                "maXa": "81705049",
                "tenXa": "Xã Long Hòa"
            },
            {
                "maXa": "80903006",
                "tenXa": "Xã Long Hồ"
            },
            {
                "maXa": "81716071",
                "tenXa": "Xã Long Hữu"
            },
            {
                "maXa": "81715072",
                "tenXa": "Xã Long Thành"
            },
            {
                "maXa": "81715074",
                "tenXa": "Xã Long Vĩnh"
            },
            {
                "maXa": "81713063",
                "tenXa": "Xã Lưu Nghiệp Anh"
            },
            {
                "maXa": "81109117",
                "tenXa": "Xã Lương Hòa"
            },
            {
                "maXa": "81109115",
                "tenXa": "Xã Lương Phú"
            },
            {
                "maXa": "81111122",
                "tenXa": "Xã Lộc Thuận"
            },
            {
                "maXa": "80911020",
                "tenXa": "Xã Lục Sỹ Thành"
            },
            {
                "maXa": "81107094",
                "tenXa": "Xã Mỏ Cày"
            },
            {
                "maXa": "81113108",
                "tenXa": "Xã Mỹ Chánh Hòa"
            },
            {
                "maXa": "81711058",
                "tenXa": "Xã Mỹ Long"
            },
            {
                "maXa": "80908032",
                "tenXa": "Xã Mỹ Thuận"
            },
            {
                "maXa": "80909027",
                "tenXa": "Xã Ngãi Tứ"
            },
            {
                "maXa": "81715076",
                "tenXa": "Xã Ngũ Lạc"
            },
            {
                "maXa": "81108092",
                "tenXa": "Xã Nhuận Phú Tân"
            },
            {
                "maXa": "80905003",
                "tenXa": "Xã Nhơn Phú"
            },
            {
                "maXa": "81703043",
                "tenXa": "Xã Nhị Long"
            },
            {
                "maXa": "81711061",
                "tenXa": "Xã Nhị Trường"
            },
            {
                "maXa": "81707051",
                "tenXa": "Xã Phong Thạnh"
            },
            {
                "maXa": "81105086",
                "tenXa": "Xã Phú Phụng"
            },
            {
                "maXa": "80903007",
                "tenXa": "Xã Phú Quới"
            },
            {
                "maXa": "81111124",
                "tenXa": "Xã Phú Thuận"
            },
            {
                "maXa": "81103082",
                "tenXa": "Xã Phú Túc"
            },
            {
                "maXa": "81109114",
                "tenXa": "Xã Phước Long"
            },
            {
                "maXa": "81108090",
                "tenXa": "Xã Phước Mỹ Trung"
            },
            {
                "maXa": "80913016",
                "tenXa": "Xã Quới An"
            },
            {
                "maXa": "80913013",
                "tenXa": "Xã Quới Thiện"
            },
            {
                "maXa": "81115099",
                "tenXa": "Xã Quới Điền"
            },
            {
                "maXa": "81705045",
                "tenXa": "Xã Song Lộc"
            },
            {
                "maXa": "80909028",
                "tenXa": "Xã Song Phú"
            },
            {
                "maXa": "80909026",
                "tenXa": "Xã Tam Bình"
            },
            {
                "maXa": "81707053",
                "tenXa": "Xã Tam Ngãi"
            },
            {
                "maXa": "81107095",
                "tenXa": "Xã Thành Thới"
            },
            {
                "maXa": "81115102",
                "tenXa": "Xã Thạnh Hải"
            },
            {
                "maXa": "81115103",
                "tenXa": "Xã Thạnh Phong"
            },
            {
                "maXa": "81115100",
                "tenXa": "Xã Thạnh Phú"
            },
            {
                "maXa": "81111119",
                "tenXa": "Xã Thạnh Phước"
            },
            {
                "maXa": "81111121",
                "tenXa": "Xã Thạnh Trị"
            },
            {
                "maXa": "81111118",
                "tenXa": "Xã Thới Thuận"
            },
            {
                "maXa": "81103084",
                "tenXa": "Xã Tiên Thủy"
            },
            {
                "maXa": "81709056",
                "tenXa": "Xã Tiểu Cần"
            },
            {
                "maXa": "80913017",
                "tenXa": "Xã Trung Hiệp"
            },
            {
                "maXa": "80913015",
                "tenXa": "Xã Trung Ngãi"
            },
            {
                "maXa": "80913014",
                "tenXa": "Xã Trung Thành"
            },
            {
                "maXa": "80911022",
                "tenXa": "Xã Trà Côn"
            },
            {
                "maXa": "81713066",
                "tenXa": "Xã Trà Cú"
            },
            {
                "maXa": "80911021",
                "tenXa": "Xã Trà Ôn"
            },
            {
                "maXa": "81703041",
                "tenXa": "Xã Tân An"
            },
            {
                "maXa": "81109113",
                "tenXa": "Xã Tân Hào"
            },
            {
                "maXa": "81709054",
                "tenXa": "Xã Tân Hòa"
            },
            {
                "maXa": "80905002",
                "tenXa": "Xã Tân Long Hội"
            },
            {
                "maXa": "80908031",
                "tenXa": "Xã Tân Lược"
            },
            {
                "maXa": "81103085",
                "tenXa": "Xã Tân Phú"
            },
            {
                "maXa": "80908030",
                "tenXa": "Xã Tân Quới"
            },
            {
                "maXa": "81108091",
                "tenXa": "Xã Tân Thành Bình"
            },
            {
                "maXa": "81113104",
                "tenXa": "Xã Tân Thủy"
            },
            {
                "maXa": "81113107",
                "tenXa": "Xã Tân Xuân"
            },
            {
                "maXa": "81709057",
                "tenXa": "Xã Tập Ngãi"
            },
            {
                "maXa": "81713068",
                "tenXa": "Xã Tập Sơn"
            },
            {
                "maXa": "81711059",
                "tenXa": "Xã Vinh Kim"
            },
            {
                "maXa": "81105088",
                "tenXa": "Xã Vĩnh Thành"
            },
            {
                "maXa": "80911023",
                "tenXa": "Xã Vĩnh Xuân"
            },
            {
                "maXa": "81715075",
                "tenXa": "Xã Đôn Châu"
            },
            {
                "maXa": "81715073",
                "tenXa": "Xã Đông Hải"
            },
            {
                "maXa": "81713064",
                "tenXa": "Xã Đại An"
            },
            {
                "maXa": "81115098",
                "tenXa": "Xã Đại Điền"
            },
            {
                "maXa": "81107093",
                "tenXa": "Xã Đồng Khởi"
            }
        ]
    },
    {
        "maThanhPho": "13",
        "thanhPho": "Tỉnh Điện Biên",
        "xaPhuong": [
            {
                "maXa": "30103004",
                "tenXa": "Phường Mường Lay"
            },
            {
                "maXa": "30101003",
                "tenXa": "Phường Mường Thanh"
            },
            {
                "maXa": "30101002",
                "tenXa": "Phường Điện Biên Phủ"
            },
            {
                "maXa": "30121044",
                "tenXa": "Xã Búng Lao"
            },
            {
                "maXa": "30115015",
                "tenXa": "Xã Chiềng Sinh"
            },
            {
                "maXa": "30123035",
                "tenXa": "Xã Chà Tở"
            },
            {
                "maXa": "30123032",
                "tenXa": "Xã Mường Chà"
            },
            {
                "maXa": "30119029",
                "tenXa": "Xã Mường Luân"
            },
            {
                "maXa": "30121045",
                "tenXa": "Xã Mường Lạn"
            },
            {
                "maXa": "30115013",
                "tenXa": "Xã Mường Mùn"
            },
            {
                "maXa": "30117010",
                "tenXa": "Xã Mường Nhà"
            },
            {
                "maXa": "30104037",
                "tenXa": "Xã Mường Nhé"
            },
            {
                "maXa": "30101001",
                "tenXa": "Xã Mường Phăng"
            },
            {
                "maXa": "30111025",
                "tenXa": "Xã Mường Pồn"
            },
            {
                "maXa": "30104039",
                "tenXa": "Xã Mường Toong"
            },
            {
                "maXa": "30111022",
                "tenXa": "Xã Mường Tùng"
            },
            {
                "maXa": "30121042",
                "tenXa": "Xã Mường Ảng"
            },
            {
                "maXa": "30111021",
                "tenXa": "Xã Na Sang"
            },
            {
                "maXa": "30119026",
                "tenXa": "Xã Na Son"
            },
            {
                "maXa": "30123034",
                "tenXa": "Xã Nà Bủng"
            },
            {
                "maXa": "30123033",
                "tenXa": "Xã Nà Hỳ"
            },
            {
                "maXa": "30121043",
                "tenXa": "Xã Nà Tấu"
            },
            {
                "maXa": "30117009",
                "tenXa": "Xã Núa Ngam"
            },
            {
                "maXa": "30104040",
                "tenXa": "Xã Nậm Kè"
            },
            {
                "maXa": "30111024",
                "tenXa": "Xã Nậm Nèn"
            },
            {
                "maXa": "30111023",
                "tenXa": "Xã Pa Ham"
            },
            {
                "maXa": "30119031",
                "tenXa": "Xã Phình Giàng"
            },
            {
                "maXa": "30119028",
                "tenXa": "Xã Pu Nhi"
            },
            {
                "maXa": "30115014",
                "tenXa": "Xã Pú Nhung"
            },
            {
                "maXa": "30115012",
                "tenXa": "Xã Quài Tở"
            },
            {
                "maXa": "30104041",
                "tenXa": "Xã Quảng Lâm"
            },
            {
                "maXa": "30117008",
                "tenXa": "Xã Sam Mứn"
            },
            {
                "maXa": "30123036",
                "tenXa": "Xã Si Pa Phìn"
            },
            {
                "maXa": "30113020",
                "tenXa": "Xã Sáng Nhè"
            },
            {
                "maXa": "30113017",
                "tenXa": "Xã Sín Chải"
            },
            {
                "maXa": "30104038",
                "tenXa": "Xã Sín Thầu"
            },
            {
                "maXa": "30113018",
                "tenXa": "Xã Sính Phình"
            },
            {
                "maXa": "30117006",
                "tenXa": "Xã Thanh An"
            },
            {
                "maXa": "30117005",
                "tenXa": "Xã Thanh Nưa"
            },
            {
                "maXa": "30117007",
                "tenXa": "Xã Thanh Yên"
            },
            {
                "maXa": "30115011",
                "tenXa": "Xã Tuần Giáo"
            },
            {
                "maXa": "30119030",
                "tenXa": "Xã Tìa Dình"
            },
            {
                "maXa": "30113016",
                "tenXa": "Xã Tủa Chùa"
            },
            {
                "maXa": "30113019",
                "tenXa": "Xã Tủa Thàng"
            },
            {
                "maXa": "30119027",
                "tenXa": "Xã Xa Dung"
            }
        ]
    },
    {
        "maThanhPho": "21",
        "thanhPho": "Thành phố Đà Nẵng",
        "xaPhuong": [
            {
                "maXa": "50105005",
                "tenXa": "Phường An Hải"
            },
            {
                "maXa": "50115004",
                "tenXa": "Phường An Khê"
            },
            {
                "maXa": "50309061",
                "tenXa": "Phường An Thắng"
            },
            {
                "maXa": "50301026",
                "tenXa": "Phường Bàn Thạch"
            },
            {
                "maXa": "50115011",
                "tenXa": "Phường Cẩm Lệ"
            },
            {
                "maXa": "50101002",
                "tenXa": "Phường Hoà Cường"
            },
            {
                "maXa": "50109008",
                "tenXa": "Phường Hoà Khánh"
            },
            {
                "maXa": "50111012",
                "tenXa": "Phường Hoà Xuân"
            },
            {
                "maXa": "50301025",
                "tenXa": "Phường Hương Trà"
            },
            {
                "maXa": "50101001",
                "tenXa": "Phường Hải Châu"
            },
            {
                "maXa": "50109009",
                "tenXa": "Phường Hải Vân"
            },
            {
                "maXa": "50303065",
                "tenXa": "Phường Hội An"
            },
            {
                "maXa": "50303067",
                "tenXa": "Phường Hội An Tây"
            },
            {
                "maXa": "50303066",
                "tenXa": "Phường Hội An Đông"
            },
            {
                "maXa": "50109010",
                "tenXa": "Phường Liên Chiểu"
            },
            {
                "maXa": "50107007",
                "tenXa": "Phường Ngũ Hành Sơn"
            },
            {
                "maXa": "50301024",
                "tenXa": "Phường Quảng Phú"
            },
            {
                "maXa": "50105006",
                "tenXa": "Phường Sơn Trà"
            },
            {
                "maXa": "50301023",
                "tenXa": "Phường Tam Kỳ"
            },
            {
                "maXa": "50103003",
                "tenXa": "Phường Thanh Khê"
            },
            {
                "maXa": "50309059",
                "tenXa": "Phường Điện Bàn"
            },
            {
                "maXa": "50309062",
                "tenXa": "Phường Điện Bàn Bắc"
            },
            {
                "maXa": "50309060",
                "tenXa": "Phường Điện Bàn Đông"
            },
            {
                "maXa": "50304084",
                "tenXa": "Xã Avương"
            },
            {
                "maXa": "50111015",
                "tenXa": "Xã Bà Nà"
            },
            {
                "maXa": "50313075",
                "tenXa": "Xã Bến Giằng"
            },
            {
                "maXa": "50305083",
                "tenXa": "Xã Bến Hiên"
            },
            {
                "maXa": "50302028",
                "tenXa": "Xã Chiên Đàn"
            },
            {
                "maXa": "50311055",
                "tenXa": "Xã Duy Nghĩa"
            },
            {
                "maXa": "50311057",
                "tenXa": "Xã Duy Xuyên"
            },
            {
                "maXa": "50309064",
                "tenXa": "Xã Gò Nổi"
            },
            {
                "maXa": "50319087",
                "tenXa": "Xã Hiệp Đức"
            },
            {
                "maXa": "50111014",
                "tenXa": "Xã Hoà Tiến"
            },
            {
                "maXa": "50111013",
                "tenXa": "Xã Hoà Vang"
            },
            {
                "maXa": "50307070",
                "tenXa": "Xã Hà Nha"
            },
            {
                "maXa": "50304086",
                "tenXa": "Xã Hùng Sơn"
            },
            {
                "maXa": "50323090",
                "tenXa": "Xã Khâm Đức"
            },
            {
                "maXa": "50313078",
                "tenXa": "Xã La Dêê"
            },
            {
                "maXa": "50313079",
                "tenXa": "Xã La Êê"
            },
            {
                "maXa": "50321030",
                "tenXa": "Xã Lãnh Ngọc"
            },
            {
                "maXa": "50313076",
                "tenXa": "Xã Nam Giang"
            },
            {
                "maXa": "50311056",
                "tenXa": "Xã Nam Phước"
            },
            {
                "maXa": "50329039",
                "tenXa": "Xã Nam Trà My"
            },
            {
                "maXa": "50317053",
                "tenXa": "Xã Nông Sơn"
            },
            {
                "maXa": "50325017",
                "tenXa": "Xã Núi Thành"
            },
            {
                "maXa": "50302029",
                "tenXa": "Xã Phú Ninh"
            },
            {
                "maXa": "50307073",
                "tenXa": "Xã Phú Thuận"
            },
            {
                "maXa": "50323092",
                "tenXa": "Xã Phước Chánh"
            },
            {
                "maXa": "50323094",
                "tenXa": "Xã Phước Hiệp"
            },
            {
                "maXa": "50323091",
                "tenXa": "Xã Phước Năng"
            },
            {
                "maXa": "50323093",
                "tenXa": "Xã Phước Thành"
            },
            {
                "maXa": "50319089",
                "tenXa": "Xã Phước Trà"
            },
            {
                "maXa": "50317054",
                "tenXa": "Xã Quế Phước"
            },
            {
                "maXa": "50317051",
                "tenXa": "Xã Quế Sơn"
            },
            {
                "maXa": "50317050",
                "tenXa": "Xã Quế Sơn Trung"
            },
            {
                "maXa": "50305081",
                "tenXa": "Xã Sông Kôn"
            },
            {
                "maXa": "50305080",
                "tenXa": "Xã Sông Vàng"
            },
            {
                "maXa": "50321033",
                "tenXa": "Xã Sơn Cẩm Hà"
            },
            {
                "maXa": "50325019",
                "tenXa": "Xã Tam Anh"
            },
            {
                "maXa": "50325022",
                "tenXa": "Xã Tam Hải"
            },
            {
                "maXa": "50325018",
                "tenXa": "Xã Tam Mỹ"
            },
            {
                "maXa": "50325021",
                "tenXa": "Xã Tam Xuân"
            },
            {
                "maXa": "50311058",
                "tenXa": "Xã Thu Bồn"
            },
            {
                "maXa": "50315045",
                "tenXa": "Xã Thăng An"
            },
            {
                "maXa": "50315044",
                "tenXa": "Xã Thăng Bình"
            },
            {
                "maXa": "50315048",
                "tenXa": "Xã Thăng Phú"
            },
            {
                "maXa": "50315046",
                "tenXa": "Xã Thăng Trường"
            },
            {
                "maXa": "50315047",
                "tenXa": "Xã Thăng Điền"
            },
            {
                "maXa": "50307071",
                "tenXa": "Xã Thượng Đức"
            },
            {
                "maXa": "50321032",
                "tenXa": "Xã Thạnh Bình"
            },
            {
                "maXa": "50313074",
                "tenXa": "Xã Thạnh Mỹ"
            },
            {
                "maXa": "50321031",
                "tenXa": "Xã Tiên Phước"
            },
            {
                "maXa": "50327035",
                "tenXa": "Xã Trà Giáp"
            },
            {
                "maXa": "50329043",
                "tenXa": "Xã Trà Leng"
            },
            {
                "maXa": "50329042",
                "tenXa": "Xã Trà Linh"
            },
            {
                "maXa": "50327034",
                "tenXa": "Xã Trà Liên"
            },
            {
                "maXa": "50327038",
                "tenXa": "Xã Trà My"
            },
            {
                "maXa": "50327036",
                "tenXa": "Xã Trà Tân"
            },
            {
                "maXa": "50329040",
                "tenXa": "Xã Trà Tập"
            },
            {
                "maXa": "50329041",
                "tenXa": "Xã Trà Vân"
            },
            {
                "maXa": "50327037",
                "tenXa": "Xã Trà Đốc"
            },
            {
                "maXa": "50303068",
                "tenXa": "Xã Tân Hiệp"
            },
            {
                "maXa": "50304085",
                "tenXa": "Xã Tây Giang"
            },
            {
                "maXa": "50302027",
                "tenXa": "Xã Tây Hồ"
            },
            {
                "maXa": "50319088",
                "tenXa": "Xã Việt An"
            },
            {
                "maXa": "50307072",
                "tenXa": "Xã Vu Gia"
            },
            {
                "maXa": "50317052",
                "tenXa": "Xã Xuân Phú"
            },
            {
                "maXa": "50309063",
                "tenXa": "Xã Điện Bàn Tây"
            },
            {
                "maXa": "50305082",
                "tenXa": "Xã Đông Giang"
            },
            {
                "maXa": "50307069",
                "tenXa": "Xã Đại Lộc"
            },
            {
                "maXa": "50313077",
                "tenXa": "Xã Đắc Pring"
            },
            {
                "maXa": "50315049",
                "tenXa": "Xã Đồng Dương"
            },
            {
                "maXa": "50325020",
                "tenXa": "Xã Đức Phú"
            },
            {
                "maXa": "50113016",
                "tenXa": "Đặc khu Hoàng Sa"
            }
        ]
    },
    {
        "maThanhPho": "25",
        "thanhPho": "Tỉnh Đắk Lắk",
        "xaPhuong": [
            {
                "maXa": "60509008",
                "tenXa": "Phường Buôn Hồ"
            },
            {
                "maXa": "60501002",
                "tenXa": "Phường Buôn Ma Thuột"
            },
            {
                "maXa": "50901071",
                "tenXa": "Phường Bình Kiến"
            },
            {
                "maXa": "60509009",
                "tenXa": "Phường Cư Bao"
            },
            {
                "maXa": "60501006",
                "tenXa": "Phường Ea Kao"
            },
            {
                "maXa": "50911079",
                "tenXa": "Phường Hòa Hiệp"
            },
            {
                "maXa": "50901070",
                "tenXa": "Phường Phú Yên"
            },
            {
                "maXa": "50905076",
                "tenXa": "Phường Sông Cầu"
            },
            {
                "maXa": "60501005",
                "tenXa": "Phường Thành Nhất"
            },
            {
                "maXa": "50901069",
                "tenXa": "Phường Tuy Hòa"
            },
            {
                "maXa": "60501003",
                "tenXa": "Phường Tân An"
            },
            {
                "maXa": "60501004",
                "tenXa": "Phường Tân Lập"
            },
            {
                "maXa": "50905075",
                "tenXa": "Phường Xuân Đài"
            },
            {
                "maXa": "50911078",
                "tenXa": "Phường Đông Hòa"
            },
            {
                "maXa": "60511017",
                "tenXa": "Xã Buôn Đôn"
            },
            {
                "maXa": "60513021",
                "tenXa": "Xã Cuôr Đăng"
            },
            {
                "maXa": "60513022",
                "tenXa": "Xã Cư M’gar"
            },
            {
                "maXa": "60517049",
                "tenXa": "Xã Cư M’ta"
            },
            {
                "maXa": "60517051",
                "tenXa": "Xã Cư Prao"
            },
            {
                "maXa": "60525057",
                "tenXa": "Xã Cư Pui"
            },
            {
                "maXa": "60539026",
                "tenXa": "Xã Cư Pơng"
            },
            {
                "maXa": "60515045",
                "tenXa": "Xã Cư Yang"
            },
            {
                "maXa": "60525054",
                "tenXa": "Xã Dang Kang"
            },
            {
                "maXa": "60507033",
                "tenXa": "Xã Dliê Ya"
            },
            {
                "maXa": "60537064",
                "tenXa": "Xã Dray Bhăng"
            },
            {
                "maXa": "60523067",
                "tenXa": "Xã Dur Kmăl"
            },
            {
                "maXa": "60505012",
                "tenXa": "Xã Ea Bung"
            },
            {
                "maXa": "50913096",
                "tenXa": "Xã Ea Bá"
            },
            {
                "maXa": "60509007",
                "tenXa": "Xã Ea Drông"
            },
            {
                "maXa": "60503028",
                "tenXa": "Xã Ea Drăng"
            },
            {
                "maXa": "60503031",
                "tenXa": "Xã Ea Hiao"
            },
            {
                "maXa": "60503030",
                "tenXa": "Xã Ea H’leo"
            },
            {
                "maXa": "60515042",
                "tenXa": "Xã Ea Kar"
            },
            {
                "maXa": "60503027",
                "tenXa": "Xã Ea Khăl"
            },
            {
                "maXa": "60513018",
                "tenXa": "Xã Ea Kiết"
            },
            {
                "maXa": "60519040",
                "tenXa": "Xã Ea Kly"
            },
            {
                "maXa": "60519037",
                "tenXa": "Xã Ea Knuếc"
            },
            {
                "maXa": "60515044",
                "tenXa": "Xã Ea Knốp"
            },
            {
                "maXa": "60537065",
                "tenXa": "Xã Ea Ktur"
            },
            {
                "maXa": "50913095",
                "tenXa": "Xã Ea Ly"
            },
            {
                "maXa": "60513019",
                "tenXa": "Xã Ea M’Droh"
            },
            {
                "maXa": "60523068",
                "tenXa": "Xã Ea Na"
            },
            {
                "maXa": "60537063",
                "tenXa": "Xã Ea Ning"
            },
            {
                "maXa": "60511016",
                "tenXa": "Xã Ea Nuôl"
            },
            {
                "maXa": "60519039",
                "tenXa": "Xã Ea Phê"
            },
            {
                "maXa": "60515046",
                "tenXa": "Xã Ea Păl"
            },
            {
                "maXa": "60517048",
                "tenXa": "Xã Ea Riêng"
            },
            {
                "maXa": "60505011",
                "tenXa": "Xã Ea Rốk"
            },
            {
                "maXa": "60505010",
                "tenXa": "Xã Ea Súp"
            },
            {
                "maXa": "60517052",
                "tenXa": "Xã Ea Trang"
            },
            {
                "maXa": "60513023",
                "tenXa": "Xã Ea Tul"
            },
            {
                "maXa": "60511015",
                "tenXa": "Xã Ea Wer"
            },
            {
                "maXa": "60503029",
                "tenXa": "Xã Ea Wy"
            },
            {
                "maXa": "60515043",
                "tenXa": "Xã Ea Ô"
            },
            {
                "maXa": "60501001",
                "tenXa": "Xã Hoà Phú"
            },
            {
                "maXa": "60525053",
                "tenXa": "Xã Hoà Sơn"
            },
            {
                "maXa": "50912089",
                "tenXa": "Xã Hòa Mỹ"
            },
            {
                "maXa": "50912088",
                "tenXa": "Xã Hòa Thịnh"
            },
            {
                "maXa": "50911077",
                "tenXa": "Xã Hòa Xuân"
            },
            {
                "maXa": "60505014",
                "tenXa": "Xã Ia Lốp"
            },
            {
                "maXa": "60505013",
                "tenXa": "Xã Ia Rvê"
            },
            {
                "maXa": "60523066",
                "tenXa": "Xã Krông Ana"
            },
            {
                "maXa": "60525055",
                "tenXa": "Xã Krông Bông"
            },
            {
                "maXa": "60539025",
                "tenXa": "Xã Krông Búk"
            },
            {
                "maXa": "60531062",
                "tenXa": "Xã Krông Nô"
            },
            {
                "maXa": "60507032",
                "tenXa": "Xã Krông Năng"
            },
            {
                "maXa": "60519036",
                "tenXa": "Xã Krông Pắc"
            },
            {
                "maXa": "60517050",
                "tenXa": "Xã Krông Á"
            },
            {
                "maXa": "60531058",
                "tenXa": "Xã Liên Sơn Lắk"
            },
            {
                "maXa": "60517047",
                "tenXa": "Xã M’Drắk"
            },
            {
                "maXa": "60531060",
                "tenXa": "Xã Nam Ka"
            },
            {
                "maXa": "50915085",
                "tenXa": "Xã Phú Hòa 1"
            },
            {
                "maXa": "50915086",
                "tenXa": "Xã Phú Hòa 2"
            },
            {
                "maXa": "50903100",
                "tenXa": "Xã Phú Mỡ"
            },
            {
                "maXa": "60507035",
                "tenXa": "Xã Phú Xuân"
            },
            {
                "maXa": "60539024",
                "tenXa": "Xã Pơng Drang"
            },
            {
                "maXa": "60513020",
                "tenXa": "Xã Quảng Phú"
            },
            {
                "maXa": "50909094",
                "tenXa": "Xã Suối Trai"
            },
            {
                "maXa": "50913098",
                "tenXa": "Xã Sông Hinh"
            },
            {
                "maXa": "50909091",
                "tenXa": "Xã Sơn Hòa"
            },
            {
                "maXa": "50912090",
                "tenXa": "Xã Sơn Thành"
            },
            {
                "maXa": "60507034",
                "tenXa": "Xã Tam Giang"
            },
            {
                "maXa": "50907080",
                "tenXa": "Xã Tuy An Bắc"
            },
            {
                "maXa": "50907083",
                "tenXa": "Xã Tuy An Nam"
            },
            {
                "maXa": "50907084",
                "tenXa": "Xã Tuy An Tây"
            },
            {
                "maXa": "50907081",
                "tenXa": "Xã Tuy An Đông"
            },
            {
                "maXa": "60519038",
                "tenXa": "Xã Tân Tiến"
            },
            {
                "maXa": "50912087",
                "tenXa": "Xã Tây Hòa"
            },
            {
                "maXa": "50909093",
                "tenXa": "Xã Tây Sơn"
            },
            {
                "maXa": "50909092",
                "tenXa": "Xã Vân Hòa"
            },
            {
                "maXa": "60519041",
                "tenXa": "Xã Vụ Bổn"
            },
            {
                "maXa": "50905073",
                "tenXa": "Xã Xuân Cảnh"
            },
            {
                "maXa": "50903099",
                "tenXa": "Xã Xuân Lãnh"
            },
            {
                "maXa": "50905074",
                "tenXa": "Xã Xuân Lộc"
            },
            {
                "maXa": "50903101",
                "tenXa": "Xã Xuân Phước"
            },
            {
                "maXa": "50905072",
                "tenXa": "Xã Xuân Thọ"
            },
            {
                "maXa": "60525056",
                "tenXa": "Xã Yang Mao"
            },
            {
                "maXa": "50907082",
                "tenXa": "Xã Ô Loan"
            },
            {
                "maXa": "60531059",
                "tenXa": "Xã Đắk Liêng"
            },
            {
                "maXa": "60531061",
                "tenXa": "Xã Đắk Phơi"
            },
            {
                "maXa": "50903102",
                "tenXa": "Xã Đồng Xuân"
            },
            {
                "maXa": "50913097",
                "tenXa": "Xã Đức Bình"
            }
        ]
    },
    {
        "maThanhPho": "28",
        "thanhPho": "Tỉnh Đồng Nai",
        "xaPhuong": [
            {
                "maXa": "70709059",
                "tenXa": "Phường An Lộc"
            },
            {
                "maXa": "71301001",
                "tenXa": "Phường Biên Hoà"
            },
            {
                "maXa": "70709058",
                "tenXa": "Phường Bình Long"
            },
            {
                "maXa": "71302024",
                "tenXa": "Phường Bình Lộc"
            },
            {
                "maXa": "70711078",
                "tenXa": "Phường Bình Phước"
            },
            {
                "maXa": "71302025",
                "tenXa": "Phường Bảo Vinh"
            },
            {
                "maXa": "70710052",
                "tenXa": "Phường Chơn Thành"
            },
            {
                "maXa": "71302028",
                "tenXa": "Phường Hàng Gòn"
            },
            {
                "maXa": "71301006",
                "tenXa": "Phường Hố Nai"
            },
            {
                "maXa": "71301004",
                "tenXa": "Phường Long Bình"
            },
            {
                "maXa": "71301007",
                "tenXa": "Phường Long Hưng"
            },
            {
                "maXa": "71302027",
                "tenXa": "Phường Long Khánh"
            },
            {
                "maXa": "70710051",
                "tenXa": "Phường Minh Hưng"
            },
            {
                "maXa": "70703071",
                "tenXa": "Phường Phước Bình"
            },
            {
                "maXa": "70703072",
                "tenXa": "Phường Phước Long"
            },
            {
                "maXa": "71301090",
                "tenXa": "Phường Phước Tân"
            },
            {
                "maXa": "71301003",
                "tenXa": "Phường Tam Hiệp"
            },
            {
                "maXa": "71301089",
                "tenXa": "Phường Tam Phước"
            },
            {
                "maXa": "71301005",
                "tenXa": "Phường Trảng Dài"
            },
            {
                "maXa": "71301002",
                "tenXa": "Phường Trấn Biên"
            },
            {
                "maXa": "71307050",
                "tenXa": "Phường Tân Triều"
            },
            {
                "maXa": "71302026",
                "tenXa": "Phường Xuân Lập"
            },
            {
                "maXa": "70711077",
                "tenXa": "Phường Đồng Xoài"
            },
            {
                "maXa": "71315015",
                "tenXa": "Xã An Phước"
            },
            {
                "maXa": "71308016",
                "tenXa": "Xã An Viễn"
            },
            {
                "maXa": "70707088",
                "tenXa": "Xã Bom Bo"
            },
            {
                "maXa": "71308019",
                "tenXa": "Xã Bàu Hàm"
            },
            {
                "maXa": "71315013",
                "tenXa": "Xã Bình An"
            },
            {
                "maXa": "71308017",
                "tenXa": "Xã Bình Minh"
            },
            {
                "maXa": "70716073",
                "tenXa": "Xã Bình Tân"
            },
            {
                "maXa": "70715094",
                "tenXa": "Xã Bù Gia Mập"
            },
            {
                "maXa": "70707085",
                "tenXa": "Xã Bù Đăng"
            },
            {
                "maXa": "71311031",
                "tenXa": "Xã Cẩm Mỹ"
            },
            {
                "maXa": "71309021",
                "tenXa": "Xã Dầu Giây"
            },
            {
                "maXa": "71309022",
                "tenXa": "Xã Gia Kiệm"
            },
            {
                "maXa": "70706068",
                "tenXa": "Xã Hưng Phước"
            },
            {
                "maXa": "71308020",
                "tenXa": "Xã Hưng Thịnh"
            },
            {
                "maXa": "71305040",
                "tenXa": "Xã La Ngà"
            },
            {
                "maXa": "70716074",
                "tenXa": "Xã Long Hà"
            },
            {
                "maXa": "71315012",
                "tenXa": "Xã Long Phước"
            },
            {
                "maXa": "71315014",
                "tenXa": "Xã Long Thành"
            },
            {
                "maXa": "70705062",
                "tenXa": "Xã Lộc Hưng"
            },
            {
                "maXa": "70705061",
                "tenXa": "Xã Lộc Ninh"
            },
            {
                "maXa": "70705065",
                "tenXa": "Xã Lộc Quang"
            },
            {
                "maXa": "70705060",
                "tenXa": "Xã Lộc Thành"
            },
            {
                "maXa": "70705064",
                "tenXa": "Xã Lộc Thạnh"
            },
            {
                "maXa": "70705063",
                "tenXa": "Xã Lộc Tấn"
            },
            {
                "maXa": "70713057",
                "tenXa": "Xã Minh Đức"
            },
            {
                "maXa": "71303045",
                "tenXa": "Xã Nam Cát Tiên"
            },
            {
                "maXa": "70707084",
                "tenXa": "Xã Nghĩa Trung"
            },
            {
                "maXa": "70710053",
                "tenXa": "Xã Nha Bích"
            },
            {
                "maXa": "71317009",
                "tenXa": "Xã Nhơn Trạch"
            },
            {
                "maXa": "71305043",
                "tenXa": "Xã Phú Hoà"
            },
            {
                "maXa": "71303047",
                "tenXa": "Xã Phú Lâm"
            },
            {
                "maXa": "71307093",
                "tenXa": "Xã Phú Lý"
            },
            {
                "maXa": "70715069",
                "tenXa": "Xã Phú Nghĩa"
            },
            {
                "maXa": "70716075",
                "tenXa": "Xã Phú Riềng"
            },
            {
                "maXa": "70716076",
                "tenXa": "Xã Phú Trung"
            },
            {
                "maXa": "71305042",
                "tenXa": "Xã Phú Vinh"
            },
            {
                "maXa": "71317010",
                "tenXa": "Xã Phước An"
            },
            {
                "maXa": "70707083",
                "tenXa": "Xã Phước Sơn"
            },
            {
                "maXa": "71315011",
                "tenXa": "Xã Phước Thái"
            },
            {
                "maXa": "71311032",
                "tenXa": "Xã Sông Ray"
            },
            {
                "maXa": "71305091",
                "tenXa": "Xã Thanh Sơn"
            },
            {
                "maXa": "70706067",
                "tenXa": "Xã Thiện Hưng"
            },
            {
                "maXa": "70701079",
                "tenXa": "Xã Thuận Lợi"
            },
            {
                "maXa": "70707086",
                "tenXa": "Xã Thọ Sơn"
            },
            {
                "maXa": "71305023",
                "tenXa": "Xã Thống Nhất"
            },
            {
                "maXa": "71308018",
                "tenXa": "Xã Trảng Bom"
            },
            {
                "maXa": "71307048",
                "tenXa": "Xã Trị An"
            },
            {
                "maXa": "71303044",
                "tenXa": "Xã Tà Lài"
            },
            {
                "maXa": "71307049",
                "tenXa": "Xã Tân An"
            },
            {
                "maXa": "70713055",
                "tenXa": "Xã Tân Hưng"
            },
            {
                "maXa": "70713056",
                "tenXa": "Xã Tân Khai"
            },
            {
                "maXa": "70701081",
                "tenXa": "Xã Tân Lợi"
            },
            {
                "maXa": "71303046",
                "tenXa": "Xã Tân Phú"
            },
            {
                "maXa": "70713054",
                "tenXa": "Xã Tân Quan"
            },
            {
                "maXa": "70706066",
                "tenXa": "Xã Tân Tiến"
            },
            {
                "maXa": "71313039",
                "tenXa": "Xã Xuân Bắc"
            },
            {
                "maXa": "71313037",
                "tenXa": "Xã Xuân Hoà"
            },
            {
                "maXa": "71313036",
                "tenXa": "Xã Xuân Lộc"
            },
            {
                "maXa": "71313035",
                "tenXa": "Xã Xuân Phú"
            },
            {
                "maXa": "71311029",
                "tenXa": "Xã Xuân Quế"
            },
            {
                "maXa": "71313038",
                "tenXa": "Xã Xuân Thành"
            },
            {
                "maXa": "71311033",
                "tenXa": "Xã Xuân Đông"
            },
            {
                "maXa": "71311030",
                "tenXa": "Xã Xuân Đường"
            },
            {
                "maXa": "71313034",
                "tenXa": "Xã Xuân Định"
            },
            {
                "maXa": "70715070",
                "tenXa": "Xã Đa Kia"
            },
            {
                "maXa": "71303092",
                "tenXa": "Xã Đak Lua"
            },
            {
                "maXa": "70707087",
                "tenXa": "Xã Đak Nhau"
            },
            {
                "maXa": "70715095",
                "tenXa": "Xã Đăk Ơ"
            },
            {
                "maXa": "71317008",
                "tenXa": "Xã Đại Phước"
            },
            {
                "maXa": "71305041",
                "tenXa": "Xã Định Quán"
            },
            {
                "maXa": "70701082",
                "tenXa": "Xã Đồng Phú"
            },
            {
                "maXa": "70701080",
                "tenXa": "Xã Đồng Tâm"
            }
        ]
    },
    {
        "maThanhPho": "31",
        "thanhPho": "Tỉnh Đồng Tháp",
        "xaPhuong": [
            {
                "maXa": "80323062",
                "tenXa": "Phường An Bình"
            },
            {
                "maXa": "80703009",
                "tenXa": "Phường Bình Xuân"
            },
            {
                "maXa": "80721012",
                "tenXa": "Phường Cai Lậy"
            },
            {
                "maXa": "80301089",
                "tenXa": "Phường Cao Lãnh"
            },
            {
                "maXa": "80703006",
                "tenXa": "Phường Gò Công"
            },
            {
                "maXa": "80323063",
                "tenXa": "Phường Hồng Ngự"
            },
            {
                "maXa": "80703007",
                "tenXa": "Phường Long Thuận"
            },
            {
                "maXa": "80301090",
                "tenXa": "Phường Mỹ Ngãi"
            },
            {
                "maXa": "80701003",
                "tenXa": "Phường Mỹ Phong"
            },
            {
                "maXa": "80721010",
                "tenXa": "Phường Mỹ Phước Tây"
            },
            {
                "maXa": "80701001",
                "tenXa": "Phường Mỹ Tho"
            },
            {
                "maXa": "80301091",
                "tenXa": "Phường Mỹ Trà"
            },
            {
                "maXa": "80721013",
                "tenXa": "Phường Nhị Quý"
            },
            {
                "maXa": "80303098",
                "tenXa": "Phường Sa Đéc"
            },
            {
                "maXa": "80703008",
                "tenXa": "Phường Sơn Qui"
            },
            {
                "maXa": "80721011",
                "tenXa": "Phường Thanh Hoà"
            },
            {
                "maXa": "80307064",
                "tenXa": "Phường Thường Lạc"
            },
            {
                "maXa": "80701004",
                "tenXa": "Phường Thới Sơn"
            },
            {
                "maXa": "80701005",
                "tenXa": "Phường Trung An"
            },
            {
                "maXa": "80701002",
                "tenXa": "Phường Đạo Thạnh"
            },
            {
                "maXa": "80309068",
                "tenXa": "Xã An Hoà"
            },
            {
                "maXa": "80713016",
                "tenXa": "Xã An Hữu"
            },
            {
                "maXa": "80309073",
                "tenXa": "Xã An Long"
            },
            {
                "maXa": "80305061",
                "tenXa": "Xã An Phước"
            },
            {
                "maXa": "80711044",
                "tenXa": "Xã An Thạnh Thủy"
            },
            {
                "maXa": "80315085",
                "tenXa": "Xã Ba Sao"
            },
            {
                "maXa": "80315087",
                "tenXa": "Xã Bình Hàng Trung"
            },
            {
                "maXa": "80711045",
                "tenXa": "Xã Bình Ninh"
            },
            {
                "maXa": "80709023",
                "tenXa": "Xã Bình Phú"
            },
            {
                "maXa": "80311076",
                "tenXa": "Xã Bình Thành"
            },
            {
                "maXa": "80707039",
                "tenXa": "Xã Bình Trưng"
            },
            {
                "maXa": "80707034",
                "tenXa": "Xã Châu Thành"
            },
            {
                "maXa": "80711043",
                "tenXa": "Xã Chợ Gạo"
            },
            {
                "maXa": "80713022",
                "tenXa": "Xã Cái Bè"
            },
            {
                "maXa": "80717055",
                "tenXa": "Xã Gia Thuận"
            },
            {
                "maXa": "80717051",
                "tenXa": "Xã Gò Công Đông"
            },
            {
                "maXa": "80709024",
                "tenXa": "Xã Hiệp Đức"
            },
            {
                "maXa": "80319096",
                "tenXa": "Xã Hoà Long"
            },
            {
                "maXa": "80705032",
                "tenXa": "Xã Hưng Thạnh"
            },
            {
                "maXa": "80713020",
                "tenXa": "Xã Hậu Mỹ"
            },
            {
                "maXa": "80713021",
                "tenXa": "Xã Hội Cư"
            },
            {
                "maXa": "80707038",
                "tenXa": "Xã Kim Sơn"
            },
            {
                "maXa": "80319095",
                "tenXa": "Xã Lai Vung"
            },
            {
                "maXa": "80715049",
                "tenXa": "Xã Long Bình"
            },
            {
                "maXa": "80707035",
                "tenXa": "Xã Long Hưng"
            },
            {
                "maXa": "80307066",
                "tenXa": "Xã Long Khánh"
            },
            {
                "maXa": "80307067",
                "tenXa": "Xã Long Phú Thuận"
            },
            {
                "maXa": "80709026",
                "tenXa": "Xã Long Tiên"
            },
            {
                "maXa": "80707036",
                "tenXa": "Xã Long Định"
            },
            {
                "maXa": "80711041",
                "tenXa": "Xã Lương Hoà Lạc"
            },
            {
                "maXa": "80317094",
                "tenXa": "Xã Lấp Vò"
            },
            {
                "maXa": "80317092",
                "tenXa": "Xã Mỹ An Hưng"
            },
            {
                "maXa": "80315088",
                "tenXa": "Xã Mỹ Hiệp"
            },
            {
                "maXa": "80713017",
                "tenXa": "Xã Mỹ Lợi"
            },
            {
                "maXa": "80313080",
                "tenXa": "Xã Mỹ Quí"
            },
            {
                "maXa": "80713019",
                "tenXa": "Xã Mỹ Thiện"
            },
            {
                "maXa": "80709027",
                "tenXa": "Xã Mỹ Thành"
            },
            {
                "maXa": "80315086",
                "tenXa": "Xã Mỹ Thọ"
            },
            {
                "maXa": "80711040",
                "tenXa": "Xã Mỹ Tịnh An"
            },
            {
                "maXa": "80713018",
                "tenXa": "Xã Mỹ Đức Tây"
            },
            {
                "maXa": "80709025",
                "tenXa": "Xã Ngũ Hiệp"
            },
            {
                "maXa": "80319097",
                "tenXa": "Xã Phong Hoà"
            },
            {
                "maXa": "80315084",
                "tenXa": "Xã Phong Mỹ"
            },
            {
                "maXa": "80309072",
                "tenXa": "Xã Phú Cường"
            },
            {
                "maXa": "80321100",
                "tenXa": "Xã Phú Hựu"
            },
            {
                "maXa": "80715048",
                "tenXa": "Xã Phú Thành"
            },
            {
                "maXa": "80309070",
                "tenXa": "Xã Phú Thọ"
            },
            {
                "maXa": "80313083",
                "tenXa": "Xã Phương Thịnh"
            },
            {
                "maXa": "80309069",
                "tenXa": "Xã Tam Nông"
            },
            {
                "maXa": "80311074",
                "tenXa": "Xã Thanh Bình"
            },
            {
                "maXa": "80713015",
                "tenXa": "Xã Thanh Hưng"
            },
            {
                "maXa": "80313079",
                "tenXa": "Xã Thanh Mỹ"
            },
            {
                "maXa": "80313078",
                "tenXa": "Xã Tháp Mười"
            },
            {
                "maXa": "80307065",
                "tenXa": "Xã Thường Phước"
            },
            {
                "maXa": "80709028",
                "tenXa": "Xã Thạnh Phú"
            },
            {
                "maXa": "80309071",
                "tenXa": "Xã Tràm Chim"
            },
            {
                "maXa": "80313082",
                "tenXa": "Xã Trường Xuân"
            },
            {
                "maXa": "80319099",
                "tenXa": "Xã Tân Dương"
            },
            {
                "maXa": "80717053",
                "tenXa": "Xã Tân Hoà"
            },
            {
                "maXa": "80707033",
                "tenXa": "Xã Tân Hương"
            },
            {
                "maXa": "80305058",
                "tenXa": "Xã Tân Hồng"
            },
            {
                "maXa": "80305060",
                "tenXa": "Xã Tân Hộ Cơ"
            },
            {
                "maXa": "80317093",
                "tenXa": "Xã Tân Khánh Trung"
            },
            {
                "maXa": "80311077",
                "tenXa": "Xã Tân Long"
            },
            {
                "maXa": "80321101",
                "tenXa": "Xã Tân Nhuận Đông"
            },
            {
                "maXa": "80721014",
                "tenXa": "Xã Tân Phú"
            },
            {
                "maXa": "80321102",
                "tenXa": "Xã Tân Phú Trung"
            },
            {
                "maXa": "80719057",
                "tenXa": "Xã Tân Phú Đông"
            },
            {
                "maXa": "80705029",
                "tenXa": "Xã Tân Phước 1"
            },
            {
                "maXa": "80705030",
                "tenXa": "Xã Tân Phước 2"
            },
            {
                "maXa": "80705031",
                "tenXa": "Xã Tân Phước 3"
            },
            {
                "maXa": "80711042",
                "tenXa": "Xã Tân Thuận Bình"
            },
            {
                "maXa": "80305059",
                "tenXa": "Xã Tân Thành"
            },
            {
                "maXa": "80311075",
                "tenXa": "Xã Tân Thạnh"
            },
            {
                "maXa": "80719056",
                "tenXa": "Xã Tân Thới"
            },
            {
                "maXa": "80717052",
                "tenXa": "Xã Tân Điền"
            },
            {
                "maXa": "80717054",
                "tenXa": "Xã Tân Đông"
            },
            {
                "maXa": "80715046",
                "tenXa": "Xã Vĩnh Bình"
            },
            {
                "maXa": "80715050",
                "tenXa": "Xã Vĩnh Hựu"
            },
            {
                "maXa": "80707037",
                "tenXa": "Xã Vĩnh Kim"
            },
            {
                "maXa": "80313081",
                "tenXa": "Xã Đốc Binh Kiều"
            },
            {
                "maXa": "80715047",
                "tenXa": "Xã Đồng Sơn"
            }
        ]
    }
];

window.LOCATION_DATA_2025 = LOCATION_DATA_2025;
