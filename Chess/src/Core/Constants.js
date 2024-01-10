export const files = ['a','b','c','d','e','f','g','h'];
export const hints = [];

export function hideHints(){
    const visibleHints = document.querySelectorAll('.hint');
        visibleHints.forEach(hint => {
            hint.remove();
        });
    hints.length = 0;
}