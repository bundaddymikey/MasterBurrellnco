import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
    points: number;
    tier: 'Silver' | 'Gold' | 'Platinum';
    joinDate: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string) => Promise<void>;
    signup: (name: string, email: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate checking for stored session
        const storedUser = localStorage.getItem('burrell_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string) => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const mockUser: User = {
            id: '123',
            name: 'Mike Burrell',
            email,
            points: 1250,
            tier: 'Gold',
            joinDate: new Date().toISOString()
        };

        setUser(mockUser);
        localStorage.setItem('burrell_user', JSON.stringify(mockUser));
        setIsLoading(false);
    };

    const signup = async (name: string, email: string) => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        const newUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            email,
            points: 500, // Bonus points for signup (equivalent to $25 off maybe?)
            tier: 'Silver',
            joinDate: new Date().toISOString()
        };

        setUser(newUser);
        localStorage.setItem('burrell_user', JSON.stringify(newUser));
        setIsLoading(false);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('burrell_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
