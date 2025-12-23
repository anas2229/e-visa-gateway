import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Mail, Lock, User, Phone, ArrowLeft, FileText } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const success = login(formData.email, formData.password);
        if (success) {
          toast.success('تم تسجيل الدخول بنجاح');
          navigate('/');
        } else {
          toast.error('البريد الإلكتروني أو كلمة المرور غير صحيحة');
        }
      } else {
        if (!formData.name || !formData.phone) {
          toast.error('يرجى ملء جميع الحقول');
          setIsLoading(false);
          return;
        }
        const success = register(formData.name, formData.email, formData.phone, formData.password);
        if (success) {
          toast.success('تم إنشاء الحساب بنجاح');
          navigate('/');
        } else {
          toast.error('البريد الإلكتروني مستخدم بالفعل');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md animate-fade-up">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-elegant">
              <FileText className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
            </h1>
            <p className="text-muted-foreground">
              {isLogin ? 'أدخل بياناتك للوصول إلى حسابك' : 'أنشئ حسابك للبدء في استخدام النظام'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">الاسم الكامل</label>
                  <div className="relative">
                    <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="أدخل اسمك الكامل"
                      className="pr-12"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">رقم الهاتف</label>
                  <div className="relative">
                    <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="tel"
                      placeholder="أدخل رقم الهاتف"
                      className="pr-12"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="example@email.com"
                  className="pr-12"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="أدخل كلمة المرور"
                  className="pr-12"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  جاري المعالجة...
                </span>
              ) : (
                <>
                  {isLogin ? 'تسجيل الدخول' : 'إنشاء الحساب'}
                  <ArrowLeft className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-accent hover:text-accent/80 font-medium transition-colors"
            >
              {isLogin ? 'ليس لديك حساب؟ سجل الآن' : 'لديك حساب بالفعل؟ سجل دخولك'}
            </button>
          </div>

          {isLogin && (
            <div className="mt-8 p-4 rounded-xl bg-muted/50 border border-border">
              <p className="text-sm text-muted-foreground text-center">
                <strong>للدخول كمدير:</strong><br />
                البريد: admin@evisa.gov<br />
                كلمة المرور: admin123
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Right Side - Hero */}
      <div className="hidden lg:flex w-1/2 gradient-hero items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center text-primary-foreground max-w-lg animate-fade-up">
          <div className="w-24 h-24 rounded-3xl bg-primary-foreground/10 backdrop-blur flex items-center justify-center mx-auto mb-8 animate-float">
            <FileText className="w-12 h-12" />
          </div>
          <h2 className="text-4xl font-bold mb-4">نظام التأشيرة الإلكترونية</h2>
          <p className="text-lg text-primary-foreground/80 leading-relaxed">
            نظام متكامل لإدارة طلبات التأشيرات بشكل إلكتروني سريع وآمن. قدم طلبك الآن وتابع حالته بكل سهولة.
          </p>

          <div className="mt-12 grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold">٢٤/٧</div>
              <div className="text-sm text-primary-foreground/70">خدمة متواصلة</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">١٠٠٪</div>
              <div className="text-sm text-primary-foreground/70">إلكتروني</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">آمن</div>
              <div className="text-sm text-primary-foreground/70">ومشفر</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
