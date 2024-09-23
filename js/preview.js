    // Toggle mobile menu
    document.getElementById('menu-dots').addEventListener('click', function() {
        var nav = document.getElementById('main-nav').querySelector('ul');
        nav.classList.toggle('active');
    });

    // switching b/w + and image in compare section
    function toggleAddIcons() {
        const slots = document.querySelectorAll('.basket-slot');
        slots.forEach(slot => {
            const img = slot.querySelector('.product-image');
            const addIcon = slot.querySelector('.add-icon');
            
            // Check if the image src is not empty
            if (img.src && img.src !== "about:blank") { // about:blank check for empty images
                addIcon.style.display = 'none'; // Hide the icon
            } else {
                addIcon.style.display = 'block'; // Show the icon
            }
        });
    }

    // Call this function when the page loads
    window.onload = toggleAddIcons;

    // + icon smooth scrolling to products
    function scrollToProductList() {
        const productList = document.getElementById('product_list');
        if (productList) {
            productList.scrollIntoView({ behavior: 'smooth' });
        }
    }

    
    let basket = [];
    const maxItems = 3;

    function toggleBasket(productId) {
        const icon = document.querySelector(`.action[data-id="${productId}"]`);
        const plusIcon = icon.querySelector('.fa-plus');
        const checkIcon = icon.querySelector('.fa-check');

        // Check if the product is already in the basket
        const productIndex = basket.findIndex(item => item.id === productId);
        
        if (productIndex !== -1) {
            // Product is in the basket, remove it
            basket.splice(productIndex, 1);
            renderBasket();
            plusIcon.style.display = 'block'; // Show plus icon
            checkIcon.style.display = 'none'; // Hide check icon
            return; // Exit after removing
        }

        // Product is not in the basket, try to add it
        if (basket.length >= maxItems) {
            icon.classList.add('shake');
            icon.style.color = 'red';
            plusIcon.style.display = 'block'; // Ensure plus icon is shown
            checkIcon.style.display = 'none'; // Ensure check icon is hidden
            setTimeout(() => {
                icon.classList.remove('shake');
                icon.style.color = '';
            }, 3000);
            return; // Don't add the product if max limit is reached
        }

        // Fetch product details if it's not already in the basket
        fetch('json/products.json')
            .then(response => response.json())
            .then(products => {
                const product = products.find(p => p.id === productId);
                if (product) {
                    // Check again to prevent duplicate entry
                    if (!basket.find(item => item.id === product.id)) {
                        basket.push(product); // Add product to the basket
                        renderBasket();
                        plusIcon.style.display = 'none'; // Hide plus icon
                        checkIcon.style.display = 'block'; // Show check icon
                    }
                }
            })
            .catch(error => console.error('Error fetching products:', error));
    }



    function renderBasket() {
        const slots = document.querySelectorAll('.basket-slot');
        slots.forEach((slot, index) => {
            const product = basket[index];
            const img = slot.querySelector('.product-image');
            const removeIcon = slot.querySelector('.remove-icon'); // Ensure you have this icon

            if (product) {
                img.src = product.image;
                img.alt = `Image of ${product.modelName}`;
                slot.querySelector('.add-icon').style.display = 'none'; // Hide the icon if there's a product
                removeIcon.style.display = 'block'; // Show the remove icon

                // Set up remove function on the check icon
                removeIcon.onclick = () => removeFromBasket(index); // Ensure this line is included
            } else {
                img.src = '';
                img.alt = '';
                slot.querySelector('.add-icon').style.display = 'block'; // Show the icon
                removeIcon.style.display = 'none'; // Hide the remove icon
            }
        });
    }


    function removeFromBasket(index) {
        if (index >= 0 && index < basket.length) { // Check if index is valid
            const productId = basket[index].id; // Get product ID to toggle back
            basket.splice(index, 1); // Remove product from basket
            renderBasket();

            const icon = document.querySelector(`.action[data-id="${productId}"]`);
            const plusIcon = icon.querySelector('.fa-plus');
            const checkIcon = icon.querySelector('.fa-check');
            
            plusIcon.style.display = 'block'; // Show plus icon
            checkIcon.style.display = 'none'; // Hide check icon
        }
    }
    
    function clearOldComparisonData() {
const comparisonContainer = document.getElementById('comparisonContainer');
if (comparisonContainer) {
    comparisonContainer.innerHTML = ''; // Clear old data
}
}
function populateComparisonData() {
const comparisonContainer = document.getElementById('comparisonContainer');
comparisonContainer.innerHTML = ''; // Clear existing items

// Assuming you have a logic to find the highest value in the basket
const highestValues = {}; // Store the highest values for comparison

basket.forEach(product => {
    const productComparisonElement = document.createElement('div');
    productComparisonElement.className = 'comparison-item';

    productComparisonElement.innerHTML = `
        <div class="product__info">
            <img class="product__image" src="${product.image}" alt="Image of ${product.modelName}" />
            <h3 class="product__title animated-heading">${product.modelName}</h3>
            <div class="product__details highlight extra">
                <div class="product__heading">General Specifications</div>
                <div class="product__detail"><span class="product__label">Model Name:</span><span class="product__value">${product.modelName}</span></div>
                <div class="product__detail"><span class="product__label">Release Date:</span><span class="product__value">${product.releaseDate}</span></div>
                <div class="product__detail"><span class="product__label">Operating System:</span><span class="product__value">${product.operatingSystem}</span></div>
                <div class="product__detail"><span class="product__label">User Interface:</span><span class="product__value">${product.userinterface}</span></div>

                <div class="product__heading">Design and Build</div>
                <div class="product__detail"><span class="product__label">Dimensions:</span><span class="product__value">${product.dimensions}</span></div>
                <div class="product__detail"><span class="product__label">Weight:</span><span class="product__value">${product.weight}</span></div>
                <div class="product__detail"><span class="product__label">Build Materials:</span><span class="product__value">${product.buildMaterials}</span></div>
                <div class="product__detail"><span class="product__label">Colors Available:</span><span class="product__value">${product.colors.join(', ')}</span></div>

                <div class="product__heading">Display</div>
                <div class="product__detail"><span class="product__label">Type:</span><span class="product__value">${product.displayType}</span></div>
                <div class="product__detail"><span class="product__label">Size:</span><span class="product__value">${product.displaySize}</span></div>
                <div class="product__detail"><span class="product__label">Resolution:</span><span class="product__value">${product.displayResolution}</span></div>
                <div class="product__detail"><span class="product__label">Refresh Rate:</span><span class="product__value">${product.displayrefreshrate}</span></div>
                <div class="product__detail"><span class="product__label">Protection:</span><span class="product__value">${product.displayprotection}</span></div>

                <div class="product__heading">Performance</div>
                <div class="product__detail"><span class="product__label">Processor:</span><span class="product__value">${product.processor}</span></div>
                <div class="product__detail"><span class="product__label">GPU:</span><span class="product__value">${product.gpu}</span></div>
                <div class="product__detail"><span class="product__label">RAM:</span><span class="product__value">${product.ram}</span></div>
                <div class="product__detail"><span class="product__label">Storage Options:</span><span class="product__value">${product.storageOptions.join(', ')}</span></div>
                <div class="product__detail"><span class="product__label">Expandable Storage:</span><span class="product__value">${product.expandableStorage}</span></div>

                <div class="product__heading">Battery</div>
                <div class="product__detail"><span class="product__label">Capacity:</span><span class="product__value">${product.batteryCapacity}</span></div>
                <div class="product__detail"><span class="product__label">Type:</span><span class="product__value">${product.chargingType}</span></div>
                <div class="product__detail"><span class="product__label">Charging:</span><span class="product__value">${product.charging}</span></div>
                <div class="product__detail"><span class="product__label">Charging Speed:</span><span class="product__value">${product.chargingSpeed}</span></div>

                <div class="product__heading">Camera</div>
                <div class="product__detail"><span class="product__label">Rear Camera(s):</span><span class="product__value">${product.rearCameras.join(', ')}</span></div>
                <div class="product__detail"><span class="product__label">Main Sensor:</span><span class="product__value">${product.mainSensor}</span></div>
                <div class="product__detail"><span class="product__label">Secondary Sensors:</span><span class="product__value">${product.secondarySensors.join(', ')}</span></div>
                <div class="product__detail"><span class="product__label">Front Camera:</span><span class="product__value">${product.frontCamera}</span></div>

                <div class="product__heading">Connectivity</div>
                <div class="product__detail"><span class="product__label">Network:</span><span class="product__value">${product.network}</span></div>
                <div class="product__detail"><span class="product__label">Wi-Fi:</span><span class="product__value">${product.wifi}</span></div>
                <div class="product__detail"><span class="product__label">Bluetooth:</span><span class="product__value">${product.bluetooth}</span></div>
                <div class="product__detail"><span class="product__label">GPS:</span><span class="product__value">${product.gps}</span></div>
                <div class="product__detail"><span class="product__label">USB:</span><span class="product__value">${product.usb}</span></div>
                <div class="product__detail"><span class="product__label">NFC:</span><span class="product__value">${product.nfc}</span></div>

                <div class="product__heading">Audio</div>
                <div class="product__detail"><span class="product__label">Speakers:</span><span class="product__value">${product.speakers}</span></div>
                <div class="product__detail"><span class="product__label">Audio Jack:</span><span class="product__value">${product.audioJack}</span></div>

                <div class="product__heading">Sensors</div>
                <div class="product__detail"><span class="product__label">Face ID:</span><span class="product__value">${product.faceId}</span></div>
                <div class="product__detail"><span class="product__label">Accelerometer:</span><span class="product__value">${product.accelerometer}</span></div>
                <div class="product__detail"><span class="product__label">Gyroscope:</span><span class="product__value">${product.gyroscope}</span></div>
                <div class="product__detail"><span class="product__label">Proximity Sensor:</span><span class="product__value">${product.proximitysensor}</span></div>
                <div class="product__detail"><span class="product__label">Compass:</span><span class="product__value">${product.compass}</span></div>
                <div class="product__detail"><span class="product__label">Barometer:</span><span class="product__value">${product.barometer}</span></div>

                <div class="product__heading">Additional Features</div>
                <div class="product__detail"><span class="product__label">Sensors:</span><span class="product__value">${product.sensors.join(', ')}</span></div>
                <div class="product__detail"><span class="product__label">Water Resistance:</span><span class="product__value">${product.waterResistance}</span></div>
                <div class="product__detail"><span class="product__label">Dust Resistance:</span><span class="product__value">${product.dustResistance}</span></div>
                <div class="product__detail"><span class="product__label">Stereo Speakers:</span><span class="product__value">${product.stereoSpeakers}</span></div>
                
                <div class="product__heading">PrimePick's Conclusion</div>
                <div class="product__detail"><span class="product__label">Perfect For:</span><span class="product__value">${product.perfectfor}</span></div>
                <div class="product__detail"><span class="product__label">Not Ideal For:</span><span class="product__value">${product.notperfectfor}</span></div>
                <div class="product__detail"><span class="product__label">Best Feature's:</span><span class="product__value">${product.bestfeatures}</span></div>
            </div>
            <div class="product__price-section" style="align-items: center;">
                <span class="product__price animated-price" style=" margin:10px;">Price: ₹${product.price}</span>
                <span class="product__discount" style="top: 45px; right: 300px;">${product.discount}% Off</span>
                <span class="product__mrp">MRP: ₹${product.mrp}</span>
            </div>
            <span class="product__platform highlight">Available on: ${product.availability}</span>
            <button class="action action--button action--info">
                <span class="fa fa-info-circle">
                    <a href="product_details.html?id=${product.id}"> &nbsp; More Info </a>
                </span>
            </button>
        
        </div>
    `;
        
    comparisonContainer.appendChild(productComparisonElement);
});
}

function showComparisonScreen() {
document.getElementById('comparison-basket').style.display = 'none'; // Hide the basket
document.getElementById('product_list').style.display = 'none'; // Hide the product list
document.getElementById('comparisonScreen').style.display = 'block'; // Show the comparison screen
}

function showComparisonPopup() {
if (basket.length < 2) {
    alert("Please select at least 2 products to compare.");
    return;
}

clearOldComparisonData(); // Clear old comparison data
populateComparisonData(); // Populate new comparison data
showComparisonScreen(); // Show the comparison screen
}
function closeComparison() {
document.getElementById('comparisonScreen').style.display = 'none';
document.getElementById('comparison-basket').style.display = 'block';
document.getElementById('product_list').style.display = 'block';
}

    