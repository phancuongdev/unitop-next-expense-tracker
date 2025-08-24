import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="max-w-4xl mx-auto">
        {/* <!-- Header --> */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Quản lý Thu Chi
          </h1>
          <p className="text-gray-600">
            Theo dõi thu nhập và chi tiêu hàng ngày
          </p>
        </div>

        {/* <!-- Summary Cards --> */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* <!-- Thu nhập Card --> */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Thu nhập</h3>
              <i
                data-lucide="trending-up"
                className="w-4 h-4 text-green-600"
              ></i>
            </div>
            <div className="text-2xl font-bold text-green-600">+0 đ</div>
          </div>

          {/* <!-- Chi tiêu Card --> */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Chi tiêu</h3>
              <i
                data-lucide="trending-down"
                className="w-4 h-4 text-red-600"
              ></i>
            </div>
            <div className="text-2xl font-bold text-red-600">-0 đ</div>
          </div>

          {/* <!-- Số dư Card --> */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Số dư</h3>
              <i data-lucide="wallet" className="w-4 h-4 text-blue-600"></i>
            </div>
            <div className="text-2xl font-bold text-blue-600">0 đ</div>
          </div>
        </div>

        {/* <!-- Add Transaction Button --> */}
        <div className="mb-6">
          <button className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-900 flex items-center gap-2 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-plus h-4 w-4 mr-2"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            Thêm giao dịch
          </button>
        </div>

        {/* <!-- Tabs --> */}
        <div className="bg-white rounded-lg shadow-sm border">
          {/* <!-- Tab Headers --> */}
          <div className="border-b">
            <div className="flex">
              <button className="px-6 py-3 text-sm font-medium border-b-2 border-gray-900 text-gray-900">
                Tất cả
              </button>
              <button className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900">
                Thu nhập
              </button>
              <button className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900">
                Chi tiêu
              </button>
            </div>
          </div>

          {/* <!-- Tab Content --> */}
          <div className="p-6">
            {/* <!-- Empty State --> */}
            <div className="flex flex-col items-center justify-center py-12">
              <i
                data-lucide="dollar-sign"
                className="w-12 h-12 text-gray-400 mb-4"
              ></i>
              <p className="text-gray-600 text-center">
                Chưa có giao dịch nào. Hãy thêm giao dịch đầu tiên của bạn!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal Overlay (Hidden by default) --> */}
      <div
        id="modal"
        className="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center p-4"
      >
        <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
          <h2 className="text-lg font-semibold mb-4">Thêm giao dịch mới</h2>

          <form className="space-y-4">
            {/* <!-- Loại giao dịch --> */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Loại giao dịch
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900">
                <option value="expense">Chi tiêu</option>
                <option value="income">Thu nhập</option>
              </select>
            </div>

            {/* <!-- Số tiền --> */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số tiền
              </label>
              <input
                type="number"
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            {/* <!-- Mô tả --> */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mô tả
              </label>
              <input
                type="text"
                placeholder="Nhập mô tả chi tiêu"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            {/* <!-- Danh mục --> */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Danh mục
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900">
                <option value="">Chọn danh mục</option>
                <option value="food">Ăn uống</option>
                <option value="transport">Di chuyển</option>
                <option value="shopping">Mua sắm</option>
                <option value="entertainment">Giải trí</option>
                <option value="health">Y tế</option>
                <option value="education">Giáo dục</option>
                <option value="other">Khác</option>
              </select>
            </div>

            {/* <!-- Buttons --> */}
            <div className="flex gap-2 pt-4">
              <button
                type="submit"
                className="flex-1 bg-gray-900 text-white py-2 rounded-md hover:bg-gray-800"
              >
                Thêm
              </button>
              <button
                type="button"
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-50"
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      </div>

      <script>
        // Initialize Lucide icons lucide.createIcons(); // Simple modal
        functionality const modal = document.getElementById('modal'); const
        addButton = document.querySelector('button'); const cancelButton =
        document.querySelector('button[type="button"]');
        {/* addButton.addEventListener('click', () => {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
        });
        
        cancelButton.addEventListener('click', () => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        });
        
        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            }
        }); */}
      </script>
    </>
  );
}
