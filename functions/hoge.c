#include <stdio.h>

int main() {
    int n = 10;
    if (n <= 0) {
        printf("n is zero.\n");
    } else while(n > 0) {
        printf("n in %d\n", n);
        n--;
    }
    return 0;
}
