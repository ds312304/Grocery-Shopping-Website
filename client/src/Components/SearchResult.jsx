import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../Context/AppContext';
import ProductCard from '../Components/ProductCard';

const SearchResults = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q')?.toLowerCase();
    const { products } = useAppContext();
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (query && products.length > 0) {
            const filtered = products.filter(product =>
                product.name.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query) ||
                product.subCategory.toLowerCase().includes(query)
            );
            setResults(filtered);
        }
    }, [query, products]);

    return (
        <div className="px-4 py-6">
            <h2 className="text-2xl font-semibold mb-4">Search Results for "{query}"</h2>
            {results.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {results.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-xl text-primary">No products found.</p>
            )}
        </div>
    );
};

export default SearchResults;
