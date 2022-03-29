import toast, { ToastOptions } from 'react-hot-toast';

export class CustomToast {
  private static readonly options: ToastOptions = {
    position: 'top-right',
    style: {
      color: '#fff',
      backgroundColor: '#2d3748',
    },
  };

  static success(msg: string, options = CustomToast.options) {
    toast.success(msg, options);
  }

  static error(msg: string, options = CustomToast.options) {
    toast.error(msg, options);
  }

  static congratulations(msg: string, options = CustomToast.options) {
    toast(msg, {
      ...options,
      icon: '👏',
    });
  }

  static sorry(msg: string, options = CustomToast.options) {
    toast(msg, {
      ...options,
      icon: '🙁',
    });
  }
}
