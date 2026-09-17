interface StudentOptionInput { position:number; content:string; isCorrect?:boolean }
interface StudentQuestionInput {
  id:string; questionType:string; stem:string; marks:number|{toString():string};
  solution?:string; studentExplanation?:string; provenance?:unknown; normalizedHash?:string;
  options:StudentOptionInput[];
}
export function studentQuestionPayload(version:StudentQuestionInput,positions:readonly number[]){return{
  id:version.id,type:version.questionType,stem:version.stem,marks:Number(version.marks),
  options:positions.map(position=>{const option=version.options.find(candidate=>candidate.position===position);if(!option)throw new Error('Attempt snapshot contains an unknown option position');return{position:option.position,content:option.content};}),
};}
