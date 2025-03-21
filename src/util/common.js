export function mapToOptions(anyMap) {
    return Object.keys(anyMap).map((i) => {
        return {
            value: isNaN(+i) ? i : +i,
            label: anyMap[i]
        }
    })
}

export function formatTeam(teamOptioned, teamId){
    for (let i = 0; i < teamOptioned.length; i++) {
        if (teamOptioned[i].teamId === teamId) {
            return teamOptioned[i].teamName;
        }
    }
}