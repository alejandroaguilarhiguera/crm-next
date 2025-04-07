'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import { User } from '@/types';

export default function ProfileSettings() {
  const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Verificar autenticación y cargar datos del usuario
    const jwt = localStorage.getItem('jwt');
    const userData = localStorage.getItem('user');

    if (!jwt || !userData) {
      router.push('/auth/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);
    
    // Prellenar el formulario con los datos del usuario
    reset({
      username: parsedUser.username,
      email: parsedUser.email,
      firstName: parsedUser.firstName || '',
      lastName: parsedUser.lastName || '',
      phone: parsedUser.phone || '',
      bio: parsedUser.bio || '',
    });
    
    setLoading(false);
  }, [router, reset]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch(`http://localhost:1337/api/users/${user?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setSuccessMessage('Perfil actualizado correctamente');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al actualizar el perfil');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
      console.error('Profile update error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (currentPassword: string, newPassword: string) => {
    try {
      const response = await fetch('http://localhost:1337/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify({
          currentPassword,
          password: newPassword,
          passwordConfirmation: newPassword
        }),
      });

      if (!response.ok) {
        throw new Error('Error al cambiar la contraseña');
      }

      return true;
    } catch (err) {
      console.error('Password change error:', err);
      throw err;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {JSON.stringify(getValues())}
      {/* Navbar (igual que en el dashboard) */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-indigo-600">MiApp</h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link href="/dashboard" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Dashboard
                </Link>
                <Link href="/dashboard/profile" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Perfil
                </Link>
                <Link href="/dashboard/settings" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Configuración
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Button
                onClick={() => {
                  localStorage.removeItem('jwt');
                  localStorage.removeItem('user');
                  router.push('/auth/login');
                }}
              >
                Cerrar sesión
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="md:flex md:items-center md:justify-between mb-6">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Configuración de perfil
            </h1>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <Button variant={'default'}>
              Ver perfil público
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Formulario de información básica */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    {successMessage && (
                      <div className="col-span-6 rounded-md bg-green-50 p-4 mb-4">
                        <div className="flex">
                          <div className="ml-3">
                            <p className="text-sm font-medium text-green-800">{successMessage}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {error && (
                      <div className="col-span-6 rounded-md bg-red-50 p-4 mb-4">
                        <div className="flex">
                          <div className="ml-3">
                            <p className="text-sm font-medium text-red-800">{error}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Nombre de usuario
                      </label>
                      <input
                        type="text"
                        id="username"
                        {...register('username', { 
                          required: 'El nombre de usuario es requerido',
                          minLength: {
                            value: 3,
                            message: 'El nombre de usuario debe tener al menos 3 caracteres'
                          }
                        })}
                        className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.username ? 'border-red-300' : ''}`}
                      />
                      {errors.username && (
                        <p className="mt-1 text-sm text-red-600">{String(errors.username.message)}</p>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        id="email"
                        {...register('email', { 
                          required: 'El correo electrónico es requerido',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Correo electrónico inválido'
                          }
                        })}
                        className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.email ? 'border-red-300' : ''}`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{String(errors.email.message)}</p>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        Nombre
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        {...register('firstName')}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Apellido
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        {...register('lastName')}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        {...register('phone', {
                          pattern: {
                            value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/,
                            message: 'Número de teléfono inválido'
                          }
                        })}
                        className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${errors.phone ? 'border-red-300' : ''}`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{String(errors.phone.message)}</p>
                      )}
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                        Biografía
                      </label>
                      <div className="mt-1">
                        <textarea
                          id="bio"
                          {...register('bio')}
                          rows={3}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder="Cuéntanos algo sobre ti"
                          defaultValue={''}
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        Breve descripción sobre ti para tu perfil público.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <Button
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Guardando...' : 'Guardar cambios'}
                  </Button>
                </div>
              </div>
            </form>
          </div>

          {/* Sección de cambio de contraseña y avatar */}
          <div className="space-y-6">
            {/* Cambio de contraseña */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Cambiar contraseña</h3>
                <p className="mt-1 text-sm text-gray-500">Actualiza tu contraseña regularmente para mayor seguridad.</p>
              </div>
              <div className="px-4 pb-5 sm:px-6">
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const form: any= e.target;
                  const currentPassword = form.currentPassword.value;
                  const newPassword = form.newPassword.value;
                  const confirmPassword = form.confirmPassword.value;

                  if (newPassword !== confirmPassword) {
                    setError('Las contraseñas no coinciden');
                    return;
                  }

                  try {
                    await handlePasswordChange(currentPassword, newPassword);
                    setSuccessMessage('Contraseña actualizada correctamente');
                    form.reset();
                  } catch (err) {
                    setError('Error al cambiar la contraseña. Verifica tu contraseña actual.');
                  }
                }}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                        Contraseña actual
                      </label>
                      <input
                        type="password"
                        id="currentPassword"
                        name="currentPassword"
                        required
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                        Nueva contraseña
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        required
                        minLength={6}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirmar nueva contraseña
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        required
                        minLength={6}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                      >
                        Cambiar contraseña
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}