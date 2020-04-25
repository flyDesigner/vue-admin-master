
import Dictionary from './Dictionary'

//
function Graph() {
    var vertices = [];
    var adjList = new Dictionary();

    this.addVertex = function (v) {
        vertices.push(v);
        adjList.set(v, []);
    }
    this.addEdge = function (v, m) {
        adjList.get(v).push(m);
        adjList.get(m).push(v);
    }

    var graph = [[0, 2, 4, 0, 0, 0], [0, 0, 2, 4, 2, 0],
    [0, 0, 0, 0, 3, 0], [0, 0, 0, 0, 0, 2],
    [0, 0, 0, 3, 0, 2], [0, 0, 0, 0, 0, 0]];
    this.dijkstra = function (src) {
        var dist = [], visited = [],
            length = this.graph.length;
        for (var i = 0; i < length; i++) { //{1}
            dist[i] = Infinity;
            visited[i] = false;
        }
        dist[src] = 0; //{2}
        for (var i = 0; i < length - 1; i++) { //{3}
            var u = minDistance(dist, visited); //{4}
            visited[u] = true; //{5}
            for (var v = 0; v < length; v++) {
                if (!visited[v] &&
                    this.graph[u][v] != 0 && dist[u] != Infinity &&
                    dist[u] + this.graph[u][v] < dist[v]) { //{6}
                    dist[v] = dist[u] + this.graph[u][v]; //{7}
                }
            }
        }
        return dist;
    }
    var minDistance = function (dist, visited) {
        var min = Infinity, minIndex = -1;
        for (var v = 0; v < dist.length; v++) {
            if (visited[v] == false && dist[v] <= min) {
                min = dist[v];
                minIndex = v;
            }
        }
        return minIndex;
    };
    this.floydWarshall = function () {
        var dist = [],
            length = this.graph.length,
            i, j, k;
        for (i = 0; i < length; i++) { //{1}
            dist[i] = [];
            for (j = 0; j < length; j++) {
                dist[i][j] = this.graph[i][j];
            }
        }
        for (k = 0; k < length; k++) { //{2}
            for (i = 0; i < length; i++) {
                for (j = 0; j < length; j++) {
                    if (dist[i][k] + dist[k][j] < dist[i][j]) { //{3}
                        dist[i][j] = dist[i][k] + dist[k][j]; //{4}
                    }
                }
            }
        }
        return dist;
    };
}

export default Graph;