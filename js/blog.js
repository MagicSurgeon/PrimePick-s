document.addEventListener('DOMContentLoaded', function() {
    fetch('json/blog_details.json')
        .then(response => response.json())
        .then(data => {
            const blogCardsContainer = document.getElementById('blog-cards');

            data.forEach(blog => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.style.backgroundImage = `url(${blog.image})`; // Set the background image

                card.innerHTML = `
                    <div class="card__more">
                        <i class="fa fa-info-circle" title="More Info"></i>
                    </div>
                    <div class="card__content">
                        <p class="card__title">${blog.title}</p>
                        <p class="card__description">${blog.description}</p>
                        <div class="card__icons">
                        <div class="icon1">
                            <span class="icon icon--more">
                                <i class="fa fa-plus"></i><span class="action__text">More</span>
                            </span></div>
                            <div class="icon2">
                            <span class="icon icon--likes">
                                <i class="fa fa-heart"></i><span class="count">${blog.likes}</span>
                            </span>
                            <span class="icon icon--comments">
                                <i class="fa fa-comment"></i><span class="count">${blog.comments}</span>
                            </span>
                            <span class="icon icon--views">
                                <i class="fa fa-eye"></i><span class="count">${blog.views}</span>
                            </span>
                            <span class="icon icon--share">
                                <i class="fa fa-share-alt"></i><span class="count">${blog.shares}</span>
                            </span></div>
                        </div>
                    </div>
                `;

                // Add event listener for More button
                const moreButton = card.querySelector('.icon--more');
                moreButton.addEventListener('click', function() {
                    window.location.href = `blog_detail.html?id=${blog.id}`;
                });

                blogCardsContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error fetching blog data:', error));
});
