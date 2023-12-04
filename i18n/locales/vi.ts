export default {
  chooseLanguage: "Chọn ngôn ngữ",
  locales: {
    en: "Tiếng Anh",
    vi: "Tiếng Việt",
    ja: "Tiếng Nhật",
  },
  signIn: {
    title: "Đăng nhập",
    description: "Đăng nhập vào tài khoản của bạn",
    email: "Email",
    password: "Mật khẩu",
    forgotPassword: "Quên mật khẩu?",
    noAccount: "Chưa có tài khoản?",
  },
  signUp: {
    title: "Đăng ký",
    description: "Tạo tài khoản của bạn",
    email: "Email",
    password: "Mật khẩu",
    alreadyHaveAnAccount: "Đã có tài khoản?",
  },
  forgotPassword: {
    title: "Đặt lại mật khẩu",
    description: "Đặt lại mật khẩu của bạn",
    email: "Email",
    sendResetPasswordEmail: "Gửi email đặt lại mật khẩu",
    backToSignIn: "Quay lại đăng nhập",
  },
  button: {
    start: "Bắt đầu miễn phí",
    continue: "Tiếp tục",
    signUp: "Đăng ký",
    signOut: "Đăng xuất",
    forgotPassword: "Quên mật khẩu?",
    resetPassword: "Đặt lại mật khẩu",
    createAccount: "Tạo tài khoản",
    verifyEmail: "Xác minh email",
    backToSignIn: "Quay lại đăng nhập",
    changePassword: "Thay đổi mật khẩu",
    changeEmail: "Thay đổi email",
    sendVerificationEmail: "Gửi email xác minh",
    sendResetPasswordEmail: "Gửi email đặt lại mật khẩu",
    change: "Thay đổi",
    save: "Lưu",
    cancel: "Hủy",
    delete: "Xóa",
    confirm: "Xác nhận",
    resendVerificationEmail: "Gửi lại email xác minh",
  },
  landing: {
    prefix: "với",
    title: "Quản lý thương mại điện tử {prefix} {siteName}",
    description:
      "Nền tảng quản lý bán hàng với các tính năng bán hàng cần thiết",
    testimonials: {
      title: "Cảm nhận",
      description: "Người dùng nói gì về {siteName}",
    },
    billing: {
      title: "Thanh toán",
      highlight: "bắt đầu",
      description: "Sẵn sàng để {highlight}",
      plans: {
        free: "Miễn phí",
        growth: "Tăng trưởng",
        enterprise: "Doanh nghiệp",
      },
      compare: "So sánh các gói",
    },
  },
  sidebar: {
    dashboard: "Bảng điều khiển",
    billboards: "Chiến dịch quảng cáo",
    categories: "Danh mục",
    products: "Sản phẩm",
    sizes: "Kích cỡ",
    colors: "Màu sắc",
    orders: "Đơn hàng",
    customers: "Khách hàng",
    api: "APIs",
    settings: "Cài đặt",
  },
  dashboard: {
    title: "Bảng điều khiển",
    description: "Quản lý cửa hàng của bạn",
    tabs: {
      overview: {
        title: "Tổng quan",
        totalRevenue: "Tổng doanh thu",
        sales: "Doanh số",
        productInStock: "Sản phẩm tồn kho",
        growRateByMonth: "{rate} so với tháng trước",
        growRateByHour: "{rate} so với giờ trước",
        recentOrders: {
          title: "Đơn hàng gần đây",
          description: "Bạn có {salesCount} đơn hàng trong tháng này.",
        },
      },
      analytics: "Phân tích",
      reports: "Báo cáo",
      notifications: "Thông báo",
    },
    stores: {
      title: "Cửa hàng",
      description: "Quản lý các cửa hàng của bạn",
      create: "Tạo cửa hàng",
      empty: "Bạn chưa có cửa hàng nào",
      currentPlan:
        "Bạn hiện đang sử dụng {planName}. Bạn có thể tạo tối đa {maxStore} cửa hàng và {maxProduct} sản phẩm trong gói này.",
    },
    products: {
      title: "Sản phẩm",
    },
    orders: {
      title: "Đơn hàng",
    },
    customers: {
      title: "Khách hàng",
    },
    analytics: {
      title: "Phân tích",
    },
    settings: {
      title: "Cài đặt",
    },
  },
  userMenu: {
    stores: "Cửa hàng",
    settings: "Cài đặt tài khoản",
    commandMenu: "Menu lệnh",
    theme: "Giao diện",
    themeOptions: {
      light: "Sáng",
      dark: "Tối",
      system: "Hệ thống",
    },
    homepage: "Trang chủ",
    signOut: "Đăng xuất",
    upgrade: "Nâng cấp",
  },
  continueWith: "Hoặc tiếp tục với",
} as const
