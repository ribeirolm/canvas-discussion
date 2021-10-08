const fs = require('fs')
const path = require('path')
const fswrite = fs.writeFileSync
const fsappend = fs.appendFileSync

const writeHeader = (pathToFile, header) => fswrite(pathToFile, header + '\r\n')
const append = (pathToFile, row) => fsappend(pathToFile, row + '\r\n')

const escapeComment = comment => comment ? '"' + comment.replace(/"/g, "'") + '"' : ''

const writeWeeklyDiscussionsToCSV = (courseId, data) => {

  const header = [
    'author_name',
    'discussion_topic_title',
    'post_message',
    'count_of_likes',
    'timestamp'
  ]

  data.forEach(discussion => {
      const csv = path.join(__dirname, `output/${courseId}-${discussion.topicTitle}-discussion.csv`)
      writeHeader(csv, header)

      discussion.replies.forEach(reply =>
        reply.forEach(response => {
          append(csv, [                              // write replies for each discussion topic to CSV
            escapeComment(response.authorName),
            escapeComment(discussion.topicTitle),
            escapeComment(response.message).replace(/<\/?[^>]+(>|$)/g, ""),
            response.likes,
            response.timestamp
          ])
        })
      )
  })
}

module.exports = writeWeeklyDiscussionsToCSV
