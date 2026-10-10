// MatchPoint — Search, Filter, and Render Logic

function displayListings(listings) {
    const grid = document.getElementById('listings-grid');
    const countSpan = document.getElementById('result-count');
    
    if (!grid || !countSpan) return;

    countSpan.textContent = listings.length;
    grid.innerHTML = '';

    if (listings.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-12 bg-white rounded-3xl border border-slate-100">
                <i class="fa-solid fa-folder-open text-4xl text-slate-300 mb-3"></i>
                <p class="text-slate-600 font-semibold">No businesses found matching your search.</p>
                <p class="text-xs text-slate-400 mt-1">Try searching for a different keyword or category.</p>
            </div>
        `;
        return;
    }

    listings.forEach(biz => {
        const card = document.createElement('div');
        card.className = "bg-white rounded-2xl border border-slate-100 shadow-xs hover:shadow-xl hover:border-indigo-100 transition p-6 flex flex-col justify-between";
        
        card.innerHTML = `
            <div>
                <div class="flex items-start justify-between gap-4 mb-3">
                    <div>
                        <span class="inline-block px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-50 text-indigo-600 mb-2">${biz.category}</span>
                        <h3 class="font-bold text-slate-900 text-lg flex items-center gap-1.5">
                            ${biz.name}
                            ${biz.verified ? '<i class="fa-solid fa-circle-check text-indigo-600 text-xs" title="Verified Business"></i>' : ''}
                        </h3>
                    </div>
                    <span class="text-xs font-medium ${biz.tier === 'Featured' ? 'text-purple-600 bg-purple-50' : 'text-emerald-600 bg-emerald-50'} px-2.5 py-1 rounded-full">${biz.tier}</span>
                </div>
                <p class="text-slate-500 text-sm mb-4 leading-relaxed">${biz.tagline}</p>
                <div class="flex items-center gap-2 text-xs text-slate-400 mb-6">
                    <i class="fa-solid fa-location-dot text-indigo-500"></i> ${biz.location}
                </div>
            </div>
            
            <div class="pt-4 border-t border-slate-100 flex items-center gap-2">
                <a href="https://wa.me/${biz.whatsapp}" target="_blank" class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-1.5 shadow-xs shadow-emerald-100">
                    <i class="fa-brands fa-whatsapp text-sm"></i> WhatsApp
                </a>
                <a href="tel:${biz.phone}" class="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-2.5 px-3 rounded-xl transition flex items-center justify-center gap-1.5">
                    <i class="fa-solid fa-phone"></i> Call
                </a>
                <a href="profile.html?id=${biz.id}" class="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs font-semibold py-2.5 px-3 rounded-xl transition">
                    View
                </a>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterListings() {
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    
    if (!searchInput || !categoryFilter) return;

    const query = searchInput.value.toLowerCase();
    const category = categoryFilter.value.toLowerCase();

    const filtered = businessesData.filter(biz => {
        const matchesQuery = biz.name.toLowerCase().includes(query) || 
                             biz.tagline.toLowerCase().includes(query) || 
                             biz.description.toLowerCase().includes(query) ||
                             biz.location.toLowerCase().includes(query);
        
        const matchesCategory = category === "" || biz.category.toLowerCase().includes(category);

        return matchesQuery && matchesCategory;
    });

    displayListings(filtered);
}

window.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    
    if (!searchInput || !categoryFilter) return;

    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('category');
    const searchParam = urlParams.get('q');

    if (catParam) {
        categoryFilter.value = catParam.charAt(0).toUpperCase() + catParam.slice(1);
    }
    if (searchParam) {
        searchInput.value = searchParam;
    }

    filterListings();
});
