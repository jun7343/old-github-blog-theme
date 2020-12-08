$(function() {
    var container = $('.slideshow'),
        slideGroup = container.find('.slideshow_slides'),
        slides = slideGroup.find('a'),
        nav = container.find('.slideshow_nav'),
        indicator = container.find('.indicator'),
        slideCount = slides.length,
        indicatorHtml = '',
        currentIndex = 0,
        duration = 800,
        easing = 'easeInOutExpo',
        interval = 5000,
        timer,
        startClientX = endClientX = 0;

        if (slideCount > 1) {
            slides.each(function(i) {
                var newLeft = i * 100 + '%';
                $(this).css({left: newLeft});
                indicatorHtml += '<a href="">' + (i+1) + '</a>';
            });
    
            indicator.html(indicatorHtml);
        }
        
        startTimer();
        updateNav();

        //슬라이드 이동 함수
        function goToSlide(index) {
            if (index >= slideCount) {
                currentIndex = 0;
            } else if (index < 0) {
                currentIndex = slideCount - 1;
            } else {
                currentIndex = index;
            }

            slideGroup.animate({left:-100*currentIndex + '%'}, duration, easing);

            updateNav(); //처음인지, 마지막인지 검사
        }

        function updateNav() {
            var navPrev = nav.find('.prev');
            var navNext = nav.find('.next');

            if (currentIndex == 0) {
                navPrev.addClass('disabled');
            } else {
                navPrev.removeClass('disabled');
            }

            if (currentIndex == slideCount - 1) {
                navNext.addClass('disabled');
            } else {
                navNext.removeClass('disabled');
            }

            indicator.find('a').eq(currentIndex).addClass('active')
                .siblings().removeClass('active');
        }

        //인디케이터로 이동하기
        indicator.find('a').on('click', function(e) {
            e.preventDefault();
            var idx = $(this).index();
            goToSlide(idx);
        });

        //좌우 버튼으로 이동하기
        nav.find('a').on('click', function(e) {
            e.preventDefault();
            if ($(this).hasClass('prev')) {
                goToSlide(currentIndex - 1);
            } else {
                goToSlide(currentIndex + 1);
            }
        });

        function startTimer() {
            timer = setInterval(function() {
                var nextIndex = (currentIndex + 1) % slideCount;
                goToSlide(nextIndex);
            }, interval);
        }

        function stopTimer() {
            clearInterval(timer);
        }

        slideGroup.on('mouseover touchstart', function() {
            stopTimer();
        })
        .on('mouseleave touchend', function() {
            startTimer();
        });

        slideGroup.on('dragstart', function(event) {
            if (event.originalEvent.touches) {
                event = event.originalEvent.touches[0];
            }

            startClientX = event.clientX;
        });

        slideGroup.on('dragend', function(event) {
            if (event.originalEvent.touches) {
                event = event.originalEvent.touches[0];
            }

            endClientX = event.clientX;

            if (startClientX - endClientX >= 100) {
                goToSlide(currentIndex + 1);
            } else if (endClientX - startClientX >= 100) {
                goToSlide(currentIndex - 1);
            }
        });

        slideGroup.on('touchstart', function(event) {
            if (event.originalEvent.touches) {
                event = event.originalEvent.touches[0];
            }

            startClientX = event.clientX;
        });

        slideGroup.on('touchend', function(event) {
            endClientX = event.originalEvent.changedTouches[0].clientX;

            if (startClientX - endClientX >= 60) {
                goToSlide(currentIndex + 1);
            } else if (endClientX - startClientX >= 60) {
                goToSlide(currentIndex - 1);
            }
        });
})