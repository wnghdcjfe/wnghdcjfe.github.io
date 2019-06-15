#include <cstdio>
#include <algorithm>
#include <vector>
#define MAX_N 10000
using namespace std;
int n, m, disc[MAX_N + 1], cut[MAX_N + 1], ans, d, a, b;
vector<vector<int>> vt;
int dfs(int here, bool r) {
    disc[here] = ++d;
    int ret = disc[here];
    int child = 0;
    for (int there : vt[here]) {
        if (!disc[there]) {
            child++;
            int df = dfs(there, 0);
            if (!r&&df >= disc[here]) 
                cut[here] = true;
            ret = min(ret, df);
        }
        else
            ret = min(ret, disc[there]);
    }
    if (r&&child > 1) 
        cut[here] = true;
    return ret;
}
int main() {
    scanf("%d%d", &n, &m);
    vt.resize(n + 1);
    for (int i = 0; i < m; i++) {
        scanf("%d%d", &a, &b);
        vt[a].push_back(b);
        vt[b].push_back(a);
    }
    for (int i = 1; i <= n; i++)
        if (!disc[i])
            dfs(i, 1);
    for (int i = 1; i <= n; i++)
        if (cut[i])
            ans++;
    printf("%d\n", ans);
    for (int i = 1; i <= n; i++)
        if (cut[i])
            printf("%d ", i);
    return 0;
} 